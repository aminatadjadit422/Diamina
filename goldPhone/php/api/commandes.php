<?php
/**
 * Gold Phone — API Commandes
 * POST /php/api/commandes.php              → créer une commande
 * GET  /php/api/commandes.php              → mes commandes (connecté)
 * GET  /php/api/commandes.php?numero=GP-…  → suivi d'une commande
 */

require_once __DIR__ . '/../config.php';
session_start();
setJsonHeaders();

$method = $_SERVER['REQUEST_METHOD'];

// -----------------------------------------------
// GET : liste ou suivi
// -----------------------------------------------
if ($method === 'GET') {
    $db = getDB();

    // Suivi par numéro (public)
    if (!empty($_GET['numero'])) {
        $stmt = $db->prepare(
            'SELECT c.*, cl.produit_nom, cl.produit_img, cl.prix_unitaire, cl.quantite, cl.sous_total
             FROM commandes c
             JOIN commande_lignes cl ON cl.commande_id = c.id
             WHERE c.numero = ?'
        );
        $stmt->execute([$_GET['numero']]);
        $rows = $stmt->fetchAll();
        if (!$rows) {
            jsonResponse(false, null, 'Numéro de commande introuvable.', 404);
        }
        $commande = array_merge(
            array_diff_key($rows[0], array_flip(['produit_nom','produit_img','prix_unitaire','quantite','sous_total'])),
            ['lignes' => array_map(fn($r) => [
                'produit_nom'  => $r['produit_nom'],
                'produit_img'  => $r['produit_img'],
                'prix_unitaire'=> $r['prix_unitaire'],
                'quantite'     => $r['quantite'],
                'sous_total'   => $r['sous_total'],
            ], $rows)]
        );
        jsonResponse(true, $commande);
    }

    // Mes commandes (doit être connecté)
    $user = requireLogin();
    $stmt = $db->prepare(
        'SELECT c.id, c.numero, c.statut, c.total_ttc, c.paiement, c.created_at,
                COUNT(cl.id) AS nb_articles
         FROM commandes c
         LEFT JOIN commande_lignes cl ON cl.commande_id = c.id
         WHERE c.utilisateur_id = ?
         GROUP BY c.id
         ORDER BY c.created_at DESC'
    );
    $stmt->execute([$user['id']]);
    jsonResponse(true, $stmt->fetchAll());
}

// -----------------------------------------------
// POST : créer une commande
// -----------------------------------------------
if ($method === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true) ?? [];

    // Validation client
    $required = ['prenom','nom','email','telephone','wilaya','commune','adresse','lignes'];
    foreach ($required as $f) {
        if (empty($body[$f])) {
            jsonResponse(false, null, "Champ manquant : $f", 400);
        }
    }
    if (!is_array($body['lignes']) || count($body['lignes']) === 0) {
        jsonResponse(false, null, 'Le panier est vide.', 400);
    }
    if (!filter_var($body['email'], FILTER_VALIDATE_EMAIL)) {
        jsonResponse(false, null, 'Adresse email invalide.', 400);
    }

    $db = getDB();

    // Récupérer et vérifier les prix depuis la BDD (jamais faire confiance au client)
    $slugs = array_column($body['lignes'], 'slug');
    $in    = implode(',', array_fill(0, count($slugs), '?'));
    $stmt  = $db->prepare("SELECT slug, nom, prix, image, stock FROM produits WHERE slug IN ($in) AND actif = 1");
    $stmt->execute($slugs);
    $produits = $stmt->fetchAll(PDO::FETCH_UNIQUE);

    $total_ht = 0;
    $lignes   = [];
    foreach ($body['lignes'] as $ligne) {
        $slug = $ligne['slug'] ?? '';
        $qty  = max(1, (int)($ligne['qty'] ?? 1));
        if (!isset($produits[$slug])) {
            jsonResponse(false, null, "Produit introuvable : $slug", 400);
        }
        $p = $produits[$slug];
        if ($p['stock'] < $qty) {
            jsonResponse(false, null, "Stock insuffisant pour : {$p['nom']} (dispo : {$p['stock']})", 400);
        }
        $sous_total = $p['prix'] * $qty;
        $total_ht  += $sous_total;
        $lignes[]   = [
            'slug'        => $slug,
            'nom'         => $p['nom'],
            'image'       => $p['image'],
            'prix'        => $p['prix'],
            'qty'         => $qty,
            'sous_total'  => $sous_total,
        ];
    }

    // Frais de livraison (fixe 500 DA pour l'instant, logique à personnaliser)
    $frais_livraison = 500.00;
    $total_ttc       = $total_ht + $frais_livraison;

    // Générer un numéro unique
    $numero = 'GP-' . date('Y') . '-' . str_pad(rand(1, 999999), 6, '0', STR_PAD_LEFT);

    $user    = getSessionUser();
    $paiement = in_array($body['paiement'] ?? '', ['livraison','ccp','virement'])
                ? $body['paiement']
                : 'livraison';

    $db->beginTransaction();
    try {
        // Insérer commande
        $stmt = $db->prepare(
            'INSERT INTO commandes
             (numero, utilisateur_id, client_prenom, client_nom, client_email, client_tel,
              wilaya, commune, adresse, total_ht, frais_livraison, total_ttc, paiement, notes)
             VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        );
        $stmt->execute([
            $numero,
            $user['id'] ?? null,
            $body['prenom'], $body['nom'], $body['email'], $body['telephone'],
            $body['wilaya'], $body['commune'], $body['adresse'],
            $total_ht, $frais_livraison, $total_ttc, $paiement,
            $body['notes'] ?? '',
        ]);
        $commande_id = $db->lastInsertId();

        // Insérer lignes + décrémenter stock
        $stmtLigne = $db->prepare(
            'INSERT INTO commande_lignes
             (commande_id, produit_id, produit_nom, produit_img, prix_unitaire, quantite, sous_total)
             VALUES (?, (SELECT id FROM produits WHERE slug=? LIMIT 1), ?, ?, ?, ?, ?)'
        );
        $stmtStock = $db->prepare('UPDATE produits SET stock = stock - ? WHERE slug = ?');

        foreach ($lignes as $l) {
            $stmtLigne->execute([
                $commande_id, $l['slug'], $l['nom'], $l['image'],
                $l['prix'], $l['qty'], $l['sous_total'],
            ]);
            $stmtStock->execute([$l['qty'], $l['slug']]);
        }

        $db->commit();

        jsonResponse(true, [
            'numero'    => $numero,
            'total_ttc' => $total_ttc,
            'lignes'    => $lignes,
        ], 'Commande enregistrée ! Votre numéro : ' . $numero, 201);

    } catch (Exception $e) {
        $db->rollBack();
        if (DEBUG_MODE) {
            jsonResponse(false, null, $e->getMessage(), 500);
        }
        jsonResponse(false, null, 'Erreur lors de la création de la commande.', 500);
    }
}

jsonResponse(false, null, 'Méthode non autorisée.', 405);
