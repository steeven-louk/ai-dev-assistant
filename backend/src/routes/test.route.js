/**
 * Route HTTP responsable du test d'un snippet.
 */

import { Router } from "express";
import { testController } from "../controllers/test.controller.js";

const testRoute = Router();

/**
 * POST /test
 */
testRoute.post("/", testController);

export default testRoute;
