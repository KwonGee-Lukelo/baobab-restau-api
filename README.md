# Baobab-restau API

API REST développée avec **Node.js**, **Express** et **PostgreSQL** pour moderniser la gestion et la consultation en ligne du menu du restaurant **Le Baobab Gourmand** (spécialisé dans la cuisine congolaise).

---

## Sommaire

1. Technologies utilisées
2. Structure du projet
3. Prérequis
4. Installation et configuration
5. Base de données (`database.sql`)
6. Lancement de l'application
7. Endpoints de l'API
8. Critères de validation

---

## 1. Technologies utilisées

- **Runtime :** Node.js
- **Framework :** Express.js
- **Base de données :** PostgreSQL
- **Pilote BD :** `pg` (node-postgres)
- **Gestion d'environnement :** `dotenv`

---

## 2. Structure du projet

```text
baobab-restau/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   ├── health.routes.js
│   │   └── dish.routes.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
├── database.sql
└── README.md

```

- **`src/config/database.js`** : Centralise la configuration et la connexion au pool PostgreSQL.
- **`src/routes/health.routes.js`** : Regroupe les routes de vérification de l'état de l'API et de la base de données.
- **`src/routes/dish.routes.js`** : Définit les routes métier relatives aux plats (liste, par ID, par catégorie).
- **`src/app.js`** : Point d'entrée principal, configuration d'Express et enregistrement des routes.
- **`database.sql`** : Script SQL de création des tables et d'insertion des données de test.

---

## 3. Prérequis

Assure-toi d'avoir installé sur ta machine :

- [Node.js](https://nodejs.org/) (version 18+ recommandée)
- [PostgreSQL](https://www.postgresql.org/)

---

## 4. Installation et configuration

### Étape 1 : Cloner le projet ou placer les fichiers

Ouvre ton terminal dans le dossier racine du projet.

### Étape 2 : Installer les dépendances

```bash
npm install

```

### Étape 3 : Configurer les variables d'environnement

Crée un fichier `.env` à la racine du projet en t'inspirant de la structure ci-dessous :

```env
PORT=3000
DB_USER=ton_utilisateur_postgres
DB_HOST=localhost
DB_NAME=baobab_restau_db
DB_PASSWORD=ton_mot_de_passe
DB_PORT=5432

```

> ⚠️ **Sécurité :** Ne publie jamais ton fichier `.env` sur GitHub (il est déjà inclus dans le fichier `.gitignore`).

---

## 5. Base de données (`database.sql`)

Connecte-toi à ton client PostgreSQL (psql, pgAdmin ou DBeaver) et exécute les commandes du fichier `database.sql` pour initialiser la base :

```sql
-- Création de la base de données (à exécuter si elle n'existe pas)
    CREATE DATABASE "baobab-db";


-- Schema
    CREATE SCHEMA IF NOT EXISTS menu;

-- Table Categories
    CREATE TABLE IF NOT EXISTS menu.categories (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(50) NOT NULL,
        description VARCHAR(100)
    )

-- Table Plats
    CREATE TABLE IF NOT EXISTS menu.dish (
        id_dish SERIAL PRIMARY KEY,
        nom VARCHAR(30) NOT NULL,
        description VARCHAR(100),
        prix NUMERIC(10, 2) NOT NULL,
        categorie_id INTEGER,
        disponibilite BOOLEAN,

        CONSTRAINT fk_dish_categories
            FOREIGN KEY (categorie_id)
            REFERENCES menu.categories(id)
            ON DELETE SET NULL
            ON UPDATE CASCADE
    );


-- SEEDS
    INSERT INTO menu.categories(nom, description)
    VALUES ('Salade', 'Entrées fraiches et saines'),
            ('Burger', 'Burgers gourmands maison'),
            ('Tchep', 'Spécialités sénégalaises');


    INSERT INTO menu.dish(nom, description, prix, categorie_id, disponibilite)
    VALUES 	('SALADE DE CRUDITE', 'Crudités fraiches, tomate, concombre, carotte râpée et vinaigrette maison', '28000', '1', TRUE),
            ('SALADE NICOISE', 'Salade complète, thon, oeuf, haricot vert, olive et pomme de terre', '28000', '1', TRUE),
            ('SALADE CESAR', 'Poulet grillé, parmesan, croûtons dorés et sauce c"sar onctueuse', '28000', '1', TRUE),
            ('SALADE GOURMAND', 'La spéciale Baobab, poulet, avocat, crudités et fromage', '42000', '1', FALSE),
            ('TCHEP VIANDE', 'Riz au gras à la sénégalaise avec viande de boeuf fondante', '25000', '3', TRUE),
            ('TCHEP POULET', 'Tchep parfumé avec poulet braisé et légumes', '42000', '3', TRUE),
            ('TCHEP POISSON', 'Tchep au poisson capitaine, sauce tomate et légumes', '42000', '3', FALSE),
            ('BURGER FRITE', 'Burger boeuf classique avec frites croustillantes', '22800', '2', TRUE),
            ('BURGER DU CHEF', 'Double steak, cheddar, oignon caramélisé et sauce du chef', '30000', '2', TRUE),
            ('BURGER LEON', 'Le gourmand, bacon, oeuf fromage et viande juteuse', '30000', '2', FALSE);


```

---

## 6. Lancement de l'application

- **Mode développement (avec rechargement automatique via Node) :**

```bash
npm run dev

```

- **Mode production :**

```bash
npm start

```

Le serveur démarrera généralement sur l'adresse : `http://localhost:3000`.

---

## 7. Endpoints de l'API

### 🟢 Santé de l'API

- **`GET /api/health`**
- **Description :** Vérifie que l'API est en ligne.
- **Réponse (200 OK) :**

```json
{
  "status": "ok",
  "message": "Baobab-restau API is running"
}
```

- **`GET /api/health/db`**
- **Description :** Vérifie la connexion effective avec la base de données PostgreSQL.
- **Réponse (200 OK) :** Indique que la base de données est accessible.
- **Réponse d'erreur (500) :** Message d'erreur sécurisé (sans divulguer les identifiants).

### 🍲 Gestion des Plats

- **`GET /api/dishes`**
- **Description :** Récupère la liste complète de tous les plats enregistrés.
- **Exemple de réponse :**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Poulet braisé",
      "description": "Poulet braisé accompagné de bananes plantains.",
      "price": "12000.00",
      "category": "Plats principaux",
      "available": true
    }
  ]
}
```

- **`GET /api/dishes/:id`**
- **Description :** Récupère les détails d'un plat spécifique via son identifiant.
- **Erreurs :** Retourne `404 Not Found` si le plat n'existe pas.

- **`GET /api/dishes/category/:category`**
- **Description :** Filtre et retourne uniquement les plats appartenant à une catégorie spécifique (ex: `/api/dishes/category/Desserts`).

---

## 8. Critères de validation

Ce projet valide les points suivants :

- [x] Connexion sécurisée et isolée entre Node.js et PostgreSQL.
- [x] Routage propre avec Express.js.
- [x] Réponses JSON uniformisées et gestion rigoureuse des codes de statut HTTP (`200`, `404`, `500`).
- [x] Absence totale de secrets/identifiants exposés dans le code source ou sur GitHub.
