import { Router } from 'express';
import pool from "../config/database.js";

const healthRouter = Router(); //On cree une route healthRouter qui ne va traiter que le route qui a pour path '/api/heath'



export { healthRouter }
