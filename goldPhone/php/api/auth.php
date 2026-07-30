<?php
/**
 * Gold Phone — API Authentification
 * POST /php/api/auth.php?action=login      → connexion
 * POST /php/api/auth.php?action=register   → inscription
 * POST /php/api/auth.php?action=logout     → déconnexion
 * GET  /php/api/auth.php?action=me         → profil connecté
 */

require_once __DIR__ . '/../config.php';
session_start();
setJsonHeaders();

$action = $_GET['action'] ?? '';
$body   = json_decode(file_get_contents('php://input'), true) ?? [];

switch ($action) {

    // -----------------------------------------------
    case 'register':
    // -----------------------------------------------
        $prenom = trim($body['prenom'] ?? '');
        $nom    = trim($body['nom']    ?? '');
        $email  = trim($body['email']  ?? '');
        $tel    = trim($body['telephone'] ?? '');
        $pass   = $body['password'] ?? '';

        if (!$prenom || !$nom || !$email || !$pass) {
            jsonResponse(false, null, 'Tous les champs obligatoires doivent être remplis.', 400);
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            jsonResponse(false, null, 'Adresse email invalide.', 400);
        }
        if (strlen($pass) < 6) {
            jsonResponse(false, null, 'Le mot de passe doit contenir au moins 6 caractères.', 400);
        }

        $db = getDB();
        $check = $db->prepare('SELECT id FROM utilisateurs WHERE email = ?');
        $check->execute([$email]);
        if ($check->fetch()) {
            jsonResponse(false, null, 'Cette adresse email est déjà utilisée.', 409);
        }

        $hash = password_hash($pass, PASSWORD_BCRYPT, ['cost' => 12]);
        $stmt = $db->prepare(
            'INSERT INTO utilisateurs (prenom, nom, email, telephone, password)
             VALUES (?, ?, ?, ?, ?)'
        );
        $stmt->execute([$prenom, $nom, $email, $tel, $hash]);
        $id = $db->lastInsertId();

        $_SESSION['user'] = [
            'id'     => $id,
            'prenom' => $prenom,
            'nom'    => $nom,
            'email'  => $email,
            'role'   => 'client',
        ];

        jsonResponse(true, $_SESSION['user'], 'Compte créé avec succès ! Bienvenue ' . $prenom . ' !', 201);
        break;

    // -----------------------------------------------
    case 'login':
    // -----------------------------------------------
        $email = trim($body['email']    ?? '');
        $pass  = $body['password'] ?? '';

        if (!$email || !$pass) {
            jsonResponse(false, null, 'Email et mot de passe requis.', 400);
        }

        $db   = getDB();
        $stmt = $db->prepare('SELECT * FROM utilisateurs WHERE email = ? AND actif = 1');
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($pass, $user['password'])) {
            jsonResponse(false, null, 'Email ou mot de passe incorrect.', 401);
        }

        $_SESSION['user'] = [
            'id'     => $user['id'],
            'prenom' => $user['prenom'],
            'nom'    => $user['nom'],
            'email'  => $user['email'],
            'role'   => $user['role'],
        ];

        jsonResponse(true, $_SESSION['user'], 'Connexion réussie. Bienvenue ' . $user['prenom'] . ' !');
        break;

    // -----------------------------------------------
    case 'logout':
    // -----------------------------------------------
        session_destroy();
        jsonResponse(true, null, 'Déconnexion réussie.');
        break;

    // -----------------------------------------------
    case 'me':
    // -----------------------------------------------
        $user = getSessionUser();
        if (!$user) {
            jsonResponse(false, null, 'Non connecté.', 401);
        }
        jsonResponse(true, $user);
        break;

    default:
        jsonResponse(false, null, 'Action inconnue.', 400);
}
