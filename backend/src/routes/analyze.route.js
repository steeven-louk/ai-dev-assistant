/**
 * Route HTTP responsable de l'analyse d'un snippet.
 */

import { Router } from "express";
import { analyzeController } from "../controllers/analyze.controller.js";
import { apiLimiter } from "../middlewares/rateLimit.middleware.js";

const analyzeRoute = Router();

/**
 * POST /analyze
 */
analyzeRoute.post("/",apiLimiter, analyzeController);

export default analyzeRoute;
