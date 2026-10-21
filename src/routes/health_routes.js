import { Router } from "express";
import pool from "../config/database.js";

const healthRouter = Router(); //On cree une route healthRouter qui ne va traiter que le route qui a pour path '/api/heath'

const etat = {
  statut: "ok",
  message: "baobab-api est entrain de tourner",
};

healthRouter.get("/", (req, res) => {
  res.send(etat);
});

healthRouter.get("/db", (req, res) => {
  const message =
    "Votre backend s'est bien connecté à votre base des données PostgreSQL";

  pool.query("SELECT 1", (error, result) => {
    if (error) {
      return res.json({
        error: error.message,
        status: "Down",
      });
    }

    res.json({
      db_response: result.rows,
      status: message,
    });
  });
});

export { healthRouter };
