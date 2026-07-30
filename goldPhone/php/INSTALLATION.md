# 🛠️ Guide d'Installation — Gold Phone Backend PHP

## Prérequis
- PHP 8.1+
- MySQL 5.7+ ou MariaDB 10.4+
- Un hébergeur web (Hostinger, InfinityFree, OVH, o2switch…)

---

## Étape 1 — Créer la base de données

1. Connectez-vous à **phpMyAdmin** (fourni par votre hébergeur)
2. Cliquez sur **"Nouvelle base de données"**
3. Nommez-la `goldphone_db`, encodage `utf8mb4_unicode_ci`
4. Importez le fichier **`php/database.sql`** via l'onglet "Importer"

---

## Étape 2 — Configurer la connexion

Ouvrez **`php/config.php`** et renseignez vos informations :

```php
define('DB_HOST',  'localhost');       // généralement localhost
define('DB_NAME',  'goldphone_db');
define('DB_USER',  'votre_utilisateur');
define('DB_PASS',  'votre_mot_de_passe');
define('SECRET_KEY', 'changez_cette_cle_secrete');
define('SITE_URL', 'https://votre-domaine.com');
```

---

## Étape 3 — Uploader les fichiers

Uploadez **tous les fichiers** du dossier `goldPhone/` vers le dossier **`public_html/`** de votre hébergeur via FTP (FileZilla) ou le gestionnaire de fichiers.

```
public_html/
├── index.html
├── produits.html
├── panier.html
├── commande.html
├── connexion.html
├── fiche-produit.html
├── style.css
├── script.js
├── image/
│   └── *.jpg
└── php/
    ├── config.php
    ├── database.sql
    └── api/
        ├── auth.php
        ├── produits.php
        └── commandes.php
```

---

## Étape 4 — Changer le mot de passe admin

Le compte admin par défaut est :
- Email : `admin@goldphone.dz`
- Mot de passe : `Admin@2026`

**Connectez-vous immédiatement et changez le mot de passe !**

---

## Étape 5 — Tester

Ouvrez votre navigateur et vérifiez :
- `https://votre-domaine.com/` → Page d'accueil avec icône panier ✅
- `https://votre-domaine.com/php/api/produits.php` → Renvoie du JSON ✅
- `https://votre-domaine.com/connexion.html` → Formulaire de connexion ✅

---

## Structure des APIs

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/php/api/auth.php?action=register` | POST | Créer un compte |
| `/php/api/auth.php?action=login`    | POST | Se connecter |
| `/php/api/auth.php?action=logout`   | POST | Se déconnecter |
| `/php/api/auth.php?action=me`       | GET  | Profil connecté |
| `/php/api/produits.php`             | GET  | Liste produits |
| `/php/api/produits.php?marque=Iphone` | GET | Filtre marque |
| `/php/api/produits.php?slug=iphone16promax` | GET | Un produit |
| `/php/api/commandes.php`            | POST | Passer commande |
| `/php/api/commandes.php`            | GET  | Mes commandes |
| `/php/api/commandes.php?numero=GP-…`| GET  | Suivi commande |

---

## GitHub Pages (site statique)

GitHub Pages ne supporte pas le PHP. Pour déployer sur GitHub Pages :

1. Uploadez uniquement les fichiers **HTML/CSS/JS/images** (sans le dossier `php/`)
2. Le panier fonctionnera en **localStorage** (sans base de données)
3. Pour le PHP, utilisez un hébergeur séparé et pointez les appels API vers votre serveur

> **Astuce** : Utilisez [InfinityFree](https://infinityfree.net) (gratuit) ou [Hostinger](https://www.hostinger.fr) pour héberger le PHP.

---

## Sécurité

- ✅ Mots de passe hashés avec bcrypt (coût 12)
- ✅ Requêtes préparées PDO (protection SQL injection)
- ✅ Validation côté serveur de tous les champs
- ✅ Prix recalculés côté serveur (jamais faire confiance au client)
- ✅ Sessions PHP sécurisées
- ⚠️ Activez HTTPS sur votre hébergeur (certificat SSL gratuit Let's Encrypt)
