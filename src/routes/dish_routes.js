import { Router } from "express";
import pool from "../config/database.js";

const dishRouter = Router(); //On cree une route dishRouter qui ne va traiter que le route qui a pour path '/api/dish'

dishRouter.get("/", (req, res) => {
  pool.query("SELECT * FROM menu.dish", (error, result) => {
    if (error) {
      return res.json({
        error: error.message,
      });
    }

    res.json({
      status: "Votre requette marche",
      responseRequette: result.rows,
    });
  });
});

dishRouter.get("/:id", (req, res) => {
  const idParams = parseInt(req.params.id);

  pool.query(
    /*$1 veut dire on crée un trou, la valeur qui sera stocké dans 
    notre variable [idParams] sera mis dans le trou crée qui est $1*/
    "SELECT * FROM menu.dish WHERE id_dish = $1",
    [idParams],
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
