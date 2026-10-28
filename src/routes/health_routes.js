import { Router } from "express";
import pool from "../config/database.js";

const healthRouter = Router(); //On cree une route healthRouter qui ne va traiter que le route qui a pour path '/api/heath'

healthRouter.get("/", (req, res) => {
  res.status(200).json({
    statut: "ok",
    message: "baobab-restau API is running",
  });
});

healthRouter.get("/db", (req, res) => {
  pool.query("SELECT 1", (error, result) => {
    if (error) {
      return res.status(500).json({
        error: error.message,
        status: "Down",
      });
    }

    res.status(200).json({
      db_response: result.rows,
      status: "Your backend is connected",
    });
  });
});

export { healthRouter };
