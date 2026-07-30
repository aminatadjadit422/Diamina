-- ================================================
-- GOLD PHONE — Schéma de Base de Données MySQL
-- Exécutez ce fichier UNE SEULE FOIS pour créer
-- toutes les tables nécessaires au site.
-- ================================================

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS goldphone_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE goldphone_db;

-- ================================================
-- TABLE : utilisateurs
-- ================================================
CREATE TABLE IF NOT EXISTS utilisateurs (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  prenom      VARCHAR(80)  NOT NULL,
  nom         VARCHAR(80)  NOT NULL,
  email       VARCHAR(180) NOT NULL UNIQUE,
  telephone   VARCHAR(20),
  password    VARCHAR(255) NOT NULL COMMENT 'Hash bcrypt',
  role        ENUM('client','admin') NOT NULL DEFAULT 'client',
  actif       TINYINT(1) NOT NULL DEFAULT 1,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role  (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- TABLE : produits
-- ================================================
CREATE TABLE IF NOT EXISTS produits (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug        VARCHAR(120) NOT NULL UNIQUE COMMENT 'identifiant URL (ex: iphone16promax)',
  nom         VARCHAR(200) NOT NULL,
  marque      VARCHAR(60)  NOT NULL COMMENT 'Iphone | Samsung | Xiaomi | Oppo | Infinix | Honor',
  prix        DECIMAL(10,2) NOT NULL,
  prix_promo  DECIMAL(10,2) DEFAULT NULL COMMENT 'Prix barré (optionnel)',
  description TEXT,
  specs       VARCHAR(500) COMMENT 'Spécifications courtes',
  image       VARCHAR(200) NOT NULL COMMENT 'Nom du fichier dans /image/',
  badge       ENUM('','Best Seller','Nouveau','Promo','Bon Plan') DEFAULT '',
  stock       INT UNSIGNED NOT NULL DEFAULT 0,
  actif       TINYINT(1) NOT NULL DEFAULT 1,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_marque (marque),
  INDEX idx_actif  (actif),
  FULLTEXT ft_recherche (nom, marque, specs)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- TABLE : commandes
-- ================================================
CREATE TABLE IF NOT EXISTS commandes (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  numero        VARCHAR(30) NOT NULL UNIQUE COMMENT 'ex: GP-2026-000001',
  utilisateur_id INT UNSIGNED DEFAULT NULL,
  -- Info client (si non connecté)
  client_prenom  VARCHAR(80)  NOT NULL,
  client_nom     VARCHAR(80)  NOT NULL,
  client_email   VARCHAR(180) NOT NULL,
  client_tel     VARCHAR(20)  NOT NULL,
  -- Livraison
  wilaya         VARCHAR(60)  NOT NULL,
  commune        VARCHAR(80)  NOT NULL,
  adresse        TEXT         NOT NULL,
  -- Montants
  total_ht       DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  frais_livraison DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total_ttc      DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  -- Mode paiement
  paiement       ENUM('livraison','ccp','virement') NOT NULL DEFAULT 'livraison',
  -- Statut
  statut         ENUM('en_attente','confirmee','preparee','expediee','livree','annulee')
                 NOT NULL DEFAULT 'en_attente',
  notes          TEXT COMMENT 'Notes du client',
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE SET NULL,
  INDEX idx_statut (statut),
  INDEX idx_utilisateur (utilisateur_id),
  INDEX idx_numero (numero)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- TABLE : commande_lignes (détail de chaque commande)
-- ================================================
CREATE TABLE IF NOT EXISTS commande_lignes (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  commande_id  INT UNSIGNED NOT NULL,
  produit_id   INT UNSIGNED DEFAULT NULL,
  produit_nom  VARCHAR(200) NOT NULL COMMENT 'Copié pour archivage',
  produit_img  VARCHAR(200),
  prix_unitaire DECIMAL(10,2) NOT NULL,
  quantite     SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  sous_total   DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
  FOREIGN KEY (produit_id)  REFERENCES produits(id)  ON DELETE SET NULL,
  INDEX idx_commande (commande_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- TABLE : avis (notes/commentaires produits)
-- ================================================
CREATE TABLE IF NOT EXISTS avis (
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  produit_id     INT UNSIGNED NOT NULL,
  utilisateur_id INT UNSIGNED DEFAULT NULL,
  auteur_nom     VARCHAR(100) NOT NULL,
  note           TINYINT UNSIGNED NOT NULL DEFAULT 5 COMMENT '1 à 5',
  commentaire    TEXT,
  valide         TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Modération admin',
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (produit_id)     REFERENCES produits(id)     ON DELETE CASCADE,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE SET NULL,
  INDEX idx_produit (produit_id),
  INDEX idx_valide  (valide)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================
-- DONNÉES INITIALES : Admin
-- Password: Admin@2026 (bcrypt généré avec password_hash)
-- !! CHANGEZ LE MOT DE PASSE APRÈS INSTALLATION !!
-- ================================================
INSERT IGNORE INTO utilisateurs (prenom, nom, email, telephone, password, role) VALUES
('Admin', 'Gold Phone', 'admin@goldphone.dz',
 '0542960503',
 '$2y$12$2aL0XLqV3UxWoP0RqCGQUeYE5z9V5X.dXOYOOO7M0y7t1sALCXMOO',
 'admin');

-- ================================================
-- DONNÉES : Catalogue produits (depuis index.html)
-- ================================================
INSERT IGNORE INTO produits (slug, nom, marque, prix, badge, image, specs, stock) VALUES
('iphone16promax',   'iPhone 16 Pro Max 256GB',            'Iphone',  290000, 'Best Seller', 'iphone16promax.jpg',  'A18 Pro, 6.9" OLED, Triple 48MP, 5G, Titane Desert',            15),
('iphone17orange',   'iPhone 17 Pro Max 256GB',            'Iphone',  375000, 'Nouveau',     'iphone17orange.jpg',  'A19 Pro, 6.9" ProMotion OLED, Quad Camera 48MP, 5G',            10),
('samsungs25',       'Samsung Galaxy S25 Ultra 12GB 256GB','Samsung', 260000, '',            'samsungs25.jpg',      'Snapdragon 8 Elite, 6.9" Dynamic AMOLED, 200MP, S Pen, 5G',    20),
('iphone15pro',      'iPhone 15 Pro 128GB',                'Iphone',  225000, '',            'iphone 15 pro.jpg',   'A17 Pro, 6.1" OLED, Triple 48MP, 5G, Titane Naturel',           8),
('iphone14pro',      'iPhone 14 Pro Max 128GB',            'Iphone',  156000, 'Promo',       'iphone14pro.jpg',     'A16 Bionic, 6.7" ProMotion OLED, Triple 48MP, Dynamic Island',  12),
('honor2',           'Honor Magic 8 Pro 12GB 512GB',       'Honor',   240000, '',            'honor2.jpg',          'Kirin 9010, 6.8" OLED 120Hz, Triple 50MP, 5G',                  5),
('iphone13pro',      'iPhone 13 Pro Max 128GB',            'Iphone',  160000, 'Promo',       'iphone13pro.jpg',     'A15 Bionic, 6.7" ProMotion OLED, Triple 12MP, 5G, ProRes',      18),
('infinix1',         'Infinix GT30 Pro 12GB 256GB',        'Infinix',  60000, 'Bon Plan',    'infinix1.jpg',        'Dimensity 8200, 6.78" AMOLED 144Hz, 108MP, 5G, Gaming Turbo',  25),
('samsungs1',        'Samsung Galaxy A55 8GB 256GB',       'Samsung',  65000, '',            'samsung1.jpg',        'Exynos 1480, 6.6" AMOLED, Triple 50MP, 5G',                     30),
('xiaomi4',          'Xiaomi 14 Ultra 16GB 512GB',         'Xiaomi',  215000, 'Nouveau',     'xiomi4.jpg',          'Snapdragon 8 Gen 3, 6.73" AMOLED, Leica Quad 50MP, 5G',         7),
('oppo1',            'Oppo Find X8 Pro 12GB 256GB',        'Oppo',    185000, '',            'oppo1.jpg',           'Dimensity 9400, 6.78" LTPO AMOLED, Hasselblad 50MP, 5G',        9),
('infinix2',         'Infinix Note 40 Pro 8GB 256GB',      'Infinix',  42000, 'Bon Plan',    'infinix2.jpg',        'Helio G99 Ultimate, 6.78" AMOLED, 108MP, 100W charge',         40);
