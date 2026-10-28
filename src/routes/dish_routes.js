import { Router } from "express";
import pool from "../config/database.js";

const dishRouter = Router(); //On cree une route dishRouter qui ne va traiter que le route qui a pour path '/api/dishes'

dishRouter.get("/", (req, res) => {
  pool.query(
    "SELECT d.id_dish, d.nom, d.description, d.prix, d.disponibilite, c.nom AS categorie FROM menu.dish d LEFT JOIN menu.categories c ON d.categorie_id = c.id ORDER BY id_dish",
    (error, result) => {
      if (error) {
        return res.json({
          error: error.message,
        });
      }

      res.json({
        success: true,
        data: result.rows,
      });
    },
  );
});

dishRouter.get("/:id", (req, res) => {
  const idParams = parseInt(req.params.id);

  if (isNaN(idParams) || idParams <= 0) {
    return res.status(400).json({
      message: "Identifiant invalide",
    });
  }

  pool.query(
    /*$1 veut dire on crée un trou, la valeur qui sera stocké dans 
    notre variable [idParams] sera mis dans le trou crée qui est $1*/
    "SELECT d.id_dish, d.nom, d.description, d.prix, d.disponibilite, c.nom AS categorie FROM menu.dish d LEFT JOIN menu.categories c ON d.categorie_id = c.id WHERE d.id_dish = $1",
    [idParams],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (result.rows.length === 0) {
        return res.status(404).send("PLAT NON TROUVE");
      }
      res.status(200).json(result.rows);
    },
  );
});

dishRouter.get("/category/:category", (req, res) => {
  const categoryParams = req.params.category;

  if (categoryParams > 0 || categoryParams <= 0) {
    return res.status(400).json({
      message: "Categorie invalide",
    });
  }

  pool.query(
    "SELECT d.id_dish, d.nom, d.description, d.prix, d.disponibilite, c.nom AS categorie  FROM menu.dish d JOIN menu.categories c ON d.categorie_id = c.id WHERE c.nom ILIKE $1 ORDER BY d.nom ASC",
    [categoryParams],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (result.rows.length === 0) {
        return res.json({
          message:
            "ATTENTION!!! Cette categorie n'existe pas ou ne possède aucun plat",
        });
      }

      return res.status(200).json(result.rows);
    },
  );
});

dishRouter.get("/category/:category", (req, res) => {
  const nameCategorie = req.params.category;

  pool.query(
    "SELECT * FROM menu.dish WHERE categorie_id IN (SELECT id FROM menu.categories WHERE LOWER(TRIM(nom)) = LOWER(TRIM($1)))",
    [nameCategorie],
    (error, result) => {
      if (error) {
        return res.json({ error: error.message });
      }

      if (result.rows.length === 0) {
        return res.status(404).send("404 - NOT FOUND");
      }

      res.json(result.rows);
    },
  );
});

export { dishRouter };
