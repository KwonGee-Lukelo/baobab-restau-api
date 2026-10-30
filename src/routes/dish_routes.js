import { Router } from "express";
import pool from "../config/database.js";

const dishRouter = Router(); //On cree une route dishRouter qui ne va traiter que le route qui a pour path '/api/dishes'

//AFFICHER TOUT LES PLATS
dishRouter.get("/", (req, res) => {
  pool.query(
    "SELECT d.id_dish AS id, d.nom AS name, d.description AS description, d.prix AS price, d.disponibilite AS availability, c.nom AS categorie FROM menu.dish d LEFT JOIN menu.categories c ON d.categorie_id = c.id ORDER BY id_dish",
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Erreur serveur",
        });
      }

      res.json({
        success: true,
        data: result.rows,
      });
    },
  );
});

//AFFICHER TOUT LES PLATS D'UNE CATEGORIE
dishRouter.get("/category/:category", (req, res) => {
  const categoryParams = req.params.category;

  if (!isNaN(categoryParams)) {
    return res.status(400).json({
      message: "Categorie invalide",
    });
  }

  pool.query(
    "SELECT d.id_dish AS id, d.nom AS name, d.description AS description, d.prix AS price, d.disponibilite AS availability, c.nom AS categorie  FROM menu.dish d JOIN menu.categories c ON d.categorie_id = c.id WHERE c.nom ILIKE $1 ORDER BY d.nom ASC",
    [categoryParams],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      if (result.rows.length === 0) {
        return res.status(404).json({
          message:
            "ATTENTION!!! Cette categorie n'existe pas ou ne possède aucun plat",
        });
      }

      return res.status(200).json({
        success: true,
        data: result.rows,
      });
    },
  );
});

//AFFICHER UN PLAT GRACE A SON ID
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
    "SELECT d.id_dish AS id, d.nom AS name, d.description AS description, d.prix AS price, d.disponibilite AS availability, c.nom AS categorie FROM menu.dish d LEFT JOIN menu.categories c ON d.categorie_id = c.id WHERE d.id_dish = $1",
    [idParams],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Plat introuvable",
        });
      }
      res.status(200).json({
        success: true,
        data: result.rows[0],
      });
    },
  );
});

export { dishRouter };
