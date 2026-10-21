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

export { dishRouter };
