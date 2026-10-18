import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("BIENVENUE SUR NOTRE SERVEUR")
})



export { app };