import express from "express";
import { healthRouter } from "./routes/health_routes.js";

const app = express();

app.use('/api/health', healthRouter);

app.get("/", (req, res) => {
    res.send("BIENVENUE SUR NOTRE SERVEUR")
});






export { app };