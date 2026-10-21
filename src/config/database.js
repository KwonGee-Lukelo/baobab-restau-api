import pg from "pg";
import "dotenv/config"; //Cette ligne permet de chargé mon fichier .env automatiquement

const { Pool } = pg;

/*Chaîne de connexion à notre bd Postgresql
Il agit un peut comme un numero de téléphone, lorsque nous allons faire une requette SQL 
cette connexion va appelé Postgresql de maniere precise car il detient son numero qui est composé 
du user, password, host, port, database une fois l'appel aboutit il pourra lui faire la demande sur base
de la requette SQL et celui-ci va restituer les data en fonction de la requette réçu*/
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export default pool;
