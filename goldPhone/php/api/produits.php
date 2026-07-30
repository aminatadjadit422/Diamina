<?php
/**
 * Gold Phone — API Produits
 * GET  /php/api/produits.php              → liste tous les produits actifs
 * GET  /php/api/produits.php?marque=Iphone → filtre par marque
 * GET  /php/api/produits.php?q=iphone     → recherche texte
 * GET  /php/api/produits.php?slug=iphone16promax → un seul produit
 */

require_once __DIR__ . '/../config.php';
setJsonHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(false, null, 'Méthode non autorisée.', 405);
}

$db     = getDB();
$params = [];

// -----------------------------------------------
// Un seul produit par slug
// -----------------------------------------------
if (!empty($_GET['slug'])) {
    $stmt = $db->prepare(
        'SELECT p.*,
                COALESCE(ROUND(AVG(a.note), 1), 0) AS note_moyenne,
                COUNT(a.id) AS nb_avis
         FROM produits p
         LEFT JOIN avis a ON a.produit_id = p.id AND a.valide = 1
         WHERE p.slug = ? AND p.actif = 1
         GROUP BY p.id'
    );
    $stmt->execute([$_GET['slug']]);
    $produit = $stmt->fetch();
    if (!$produit) {
        jsonResponse(false, null, 'Produit introuvable.', 404);
    }
    jsonResponse(true, $produit);
}

// -----------------------------------------------
// Liste avec filtres
// -----------------------------------------------
$sql = 'SELECT p.*,
               COALESCE(ROUND(AVG(a.note), 1), 0) AS note_moyenne,
               COUNT(a.id) AS nb_avis
        FROM produits p
        LEFT JOIN avis a ON a.produit_id = p.id AND a.valide = 1
        WHERE p.actif = 1';

// Filtre marque
if (!empty($_GET['marque'])) {
    $sql .= ' AND p.marque = ?';
    $params[] = $_GET['marque'];
}

// Recherche full-text ou LIKE
if (!empty($_GET['q'])) {
    $q = '%' . $_GET['q'] . '%';
    $sql .= ' AND (p.nom LIKE ? OR p.marque LIKE ? OR p.specs LIKE ?)';
    $params[] = $q;
    $params[] = $q;
    $params[] = $q;
}

// Filtre badge
if (!empty($_GET['badge'])) {
    $sql .= ' AND p.badge = ?';
    $params[] = $_GET['badge'];
}

// Prix min/max
if (!empty($_GET['prix_min']) && is_numeric($_GET['prix_min'])) {
    $sql .= ' AND p.prix >= ?';
    $params[] = (float)$_GET['prix_min'];
}
if (!empty($_GET['prix_max']) && is_numeric($_GET['prix_max'])) {
    $sql .= ' AND p.prix <= ?';
    $params[] = (float)$_GET['prix_max'];
}

$sql .= ' GROUP BY p.id';

// Tri
$orderMap = [
    'prix_asc'  => 'p.prix ASC',
    'prix_desc' => 'p.prix DESC',
    'nouveau'   => 'p.created_at DESC',
    'populaire' => 'nb_avis DESC',
];
$order = $_GET['ordre'] ?? 'nouveau';
$sql .= ' ORDER BY ' . ($orderMap[$order] ?? 'p.created_at DESC');

// Pagination
$page     = max(1, (int)($_GET['page'] ?? 1));
$limit    = min(48, max(1, (int)($_GET['limit'] ?? 24)));
$offset   = ($page - 1) * $limit;
$sql .= ' LIMIT ? OFFSET ?';
$params[] = $limit;
$params[] = $offset;

$stmt = $db->prepare($sql);
$stmt->execute($params);
$produits = $stmt->fetchAll();

// Compter le total (sans pagination)
$countParams = array_slice($params, 0, -2);
$countSql = preg_replace('/SELECT .+? FROM/s', 'SELECT COUNT(*) AS total FROM', $sql);
$countSql = preg_replace('/GROUP BY p\.id.*$/s', '', $countSql);
$stmtCount = $db->prepare('SELECT COUNT(*) AS total FROM produits p WHERE p.actif = 1');
$stmtCount->execute();
$total = $stmtCount->fetchColumn();

jsonResponse(true, [
    'produits'   => $produits,
    'total'      => (int)$total,
    'page'       => $page,
    'pages'      => ceil($total / $limit),
    'limit'      => $limit,
]);
