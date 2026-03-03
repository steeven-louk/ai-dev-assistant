/**
 * Route HTTP responsable de l'analyse d'un snippet.
 */

import { Router } from "express";
import { analyzeController } from "../controllers/analyze.controller.js";

const analyzeRoute = Router();

/**
 * POST /analyze
 */
analyzeRoute.post("/", analyzeController);

export default analyzeRoute;
