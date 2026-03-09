/**
 * Route HTTP responsable du test d'un snippet.
 */

import { Router } from "express";
import { testController } from "../controllers/test.controller.js";
import { apiLimiter } from "../middlewares/rateLimit.middleware.js";

const testRoute = Router();

/**
 * POST /test
 */
testRoute.post("/",apiLimiter, testController);

export default testRoute;
