-- =============================================
-- CREATION DE LA BASE DE DONNEES
-- =============================================
    CREATE DATABASE "baobab-db";

-- =============================================
-- SCHEMA ET TABLES
-- =============================================
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

-- =============================================
-- DONNEES DE TEST (SEED)
-- =============================================
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
