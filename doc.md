# Baobab-restau API : construire le backend d’un menu de restaurant

## 1. CONTEXTE MÉTIER

```
Le restaurant Le Baobab Gourmand, spécialisé dans la cuisine congolaise, souhaite moderniser la gestion de son menu en ligne.

Actuellement, les informations sur les plats sont intégrées directement dans les pages du site. Chaque modification nécessite donc de modifier le code.

Le restaurant souhaite centraliser les informations relatives à ses plats dans une base de données PostgreSQL et mettre à disposition une API permettant à son application de consulter ces informations.

Tu es chargé de développer la première version de ce backend.
```

## 2. OBJECTIF GÉNÉRAL

```
Concevoir une API REST avec Node.js, Express et PostgreSQL, capable de se connecter à la base de données et de fournir des informations sur les plats du restaurant à travers différentes routes HTTP.
```

## 3. OBJECTIFS PÉDAGOGIQUES

```
À la fin du projet, tu devras être capable de :
- Configurer une connexion entre une application Node.js et PostgreSQL.
- Comprendre le rôle d'une route Express.
- Créer plusieurs routes pour répondre à des requêtes HTTP.
- Exécuter des requêtes SQL depuis Node.js.
- Retourner des réponses JSON.
- Gérer les erreurs de connexion et les erreurs liées aux requêtes.
- Organiser ton code de manière compréhensible.

PÉRIMÈTRE PÉDAGOGIQUE
Nous allons prioritairement travailler la connexion à PostgreSQL et le routage avec Express. Nous n’allons pas ajouter React, l’authentification, Docker ou d’autres technologies qui détourneraient ton attention des notions que tu viens d’apprendre.
```

## 4. FONCTIONNALITÉS ATTENDUES

```
F1 — Vérifier l’état de l’API
Route : GET /api/health

Réponse attendue :
{
  "status": "ok",
  "message": "Baobab-restau API is running"
}

F2 — Vérifier la connexion à PostgreSQL
Route : GET /api/health/db

Si la connexion fonctionne, l'API retourne une réponse JSON indiquant que la base de données est accessible.
Si elle échoue, l'API retourne une réponse d'erreur appropriée sans exposer le mot de passe, les identifiants ou d'autres informations sensibles.

F3 — Consulter tous les plats
Route : GET /api/dishes

Chaque plat doit contenir au minimum : son identifiant, son nom, sa description, son prix, sa catégorie et sa disponibilité.

Exemple de réponse (données fictives) :
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Poulet braisé",
      "description": "Poulet braisé accompagné de bananes plantains.",
      "price": 12000,
      "category": "Plats principaux",
      "available": true
    }
  ]
}

F4 — Consulter un plat précis
Route : GET /api/dishes/:id

- Si le plat existe, retourner ses informations.
- Si le plat n’existe pas, retourner une réponse 404 Not Found.

F5 — Consulter les plats d’une catégorie
Route : GET /api/dishes/category/:category
Exemple : GET /api/dishes/category/Desserts

L'API doit retourner uniquement les plats correspondant à la catégorie demandée. Il faudra aussi réfléchir au traitement d’une catégorie qui ne contient aucun plat.
```

## 5. CONCEPTION PRÉLIMINAIRE DE LA BASE DE DONNÉES

```
Table categories
- id : SERIAL — Identifiant unique
- name : VARCHAR(100) — Nom de la catégorie
- description : TEXT — Description de la catégorie

Table dishes
- id : SERIAL — Identifiant unique
- name : VARCHAR(150) — Nom du plat
- description : TEXT — Description du plat
- price : NUMERIC(10, 2) — Prix du plat
- category_id : INTEGER — Référence vers une catégorie
- available : BOOLEAN — Disponibilité du plat

La colonne category_id sera une clé étrangère vers la table categories.

POURQUOI DEUX TABLES ?
Plusieurs plats peuvent appartenir à une même catégorie. Par exemple, « Plats principaux » peut contenir le poulet braisé, le pondu et le poisson grillé. Nous évitons ainsi de répéter les informations de la catégorie dans chaque plat.
```

## 6. ORGANISATION TECHNIQUE PROPOSÉE

```
congotaste-api/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   ├── health.routes.js
│   │   └── dish.routes.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
├── database.sql
└── README.md

Rôle des fichiers :
- database.js : centraliser la connexion à PostgreSQL.
- health.routes.js : regrouper les routes de vérification.
- dish.routes.js : définir les routes relatives aux plats.
- app.js : configurer Express et enregistrer les routes.
- .env : stocker la configuration sensible de la connexion.
- database.sql : décrire la structure de la base de données.
- README.md : documenter l'installation et l'utilisation du projet.
```

## 7. CRITÈRES D’ACCEPTATION

```
CA-01 — Le serveur Express démarre sans erreur.
CA-02 — La route /api/health retourne un JSON valide.
CA-03 — La route dédiée confirme la connexion lorsque PostgreSQL est accessible.
CA-04 — La route /api/dishes retourne les données enregistrées dans PostgreSQL.
CA-05 — Un plat existant peut être récupéré par son identifiant.
CA-06 — Un plat inexistant renvoie une réponse 404.
CA-07 — Le filtre par catégorie retourne uniquement les plats correspondants.
CA-08 — Les erreurs de base de données sont traitées sans exposer d’informations sensibles.
CA-09 — Les identifiants de connexion ne sont pas publiés sur GitHub.
CA-10 — Le README explique comment installer, configurer et démarrer le projet.
```

## 8. PLAN DE RÉALISATION

```
Étape 1 — Préparer PostgreSQL
- Créer la base de données.
- Créer les deux tables.
- Ajouter quelques catégories et quelques plats de test.

Étape 2 — Connecter Node.js à PostgreSQL
- Installer les dépendances nécessaires.
- Configurer la connexion.
- Tester cette connexion indépendamment des routes métier.

Étape 3 — Créer les routes Express
- Mettre en place la route de vérification.
- Créer les routes de consultation des plats.
- Récupérer les données depuis PostgreSQL.
- Retourner des réponses JSON adaptées.

Étape 4 — Tester et documenter
- Tester chaque route avec Postman ou curl.
- Vérifier les cas d'erreur.
- Rédiger le README.
- Organiser les commits Git.
```

## 9. LIVRABLES ATTENDUS

```
1. Une base PostgreSQL fonctionnelle.
2. Une application Node.js connectée à cette base.
3. Une API Express proposant les routes demandées.
4. Des tests manuels documentés.
5. Un dépôt GitHub propre.
6. Un README permettant à un autre développeur de lancer le projet.
```
