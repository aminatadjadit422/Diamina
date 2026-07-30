<?php
/**
 * Gold Phone — Configuration Base de Données
 * Modifiez ces valeurs selon votre hébergeur
 */

define('DB_HOST',     'localhost');
define('DB_NAME',     'goldphone_db');
define('DB_USER',     'goldphone_user');     // à changer
define('DB_PASS',     'VotreMotDePasse123!'); // à changer
define('DB_CHARSET',  'utf8mb4');

// Clé secrète pour les sessions JWT (changez-la !)
define('SECRET_KEY', 'goldphone_secret_2026_changez_moi');

// URL du site (pour les redirections)
define('SITE_URL', 'https://votre-domaine.com');

// Mode debug (mettre false en production)
define('DEBUG_MODE', false);

// -----------------------------------------------
// Connexion PDO (singleton)
// -----------------------------------------------
function getDB(): PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        if (DEBUG_MODE) {
            die(json_encode(['error' => $e->getMessage()]));
        } else {
            http_response_code(500);
            die(json_encode(['error' => 'Erreur de connexion à la base de données.']));
        }
    }
    return $pdo;
}

// -----------------------------------------------
// En-têtes API JSON
// -----------------------------------------------
function setJsonHeaders(): void {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);
}

// -----------------------------------------------
// Réponse JSON standard
// -----------------------------------------------
function jsonResponse(bool $success, $data = null, string $message = '', int $code = 200): void {
    http_response_code($code);
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data'    => $data,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// -----------------------------------------------
// Sécurité : session utilisateur
// -----------------------------------------------
function getSessionUser(): ?array {
    if (session_status() === PHP_SESSION_NONE) session_start();
    return $_SESSION['user'] ?? null;
}

function requireLogin(): array {
    $user = getSessionUser();
    if (!$user) {
        jsonResponse(false, null, 'Non authentifié. Veuillez vous connecter.', 401);
    }
    return $user;
}
