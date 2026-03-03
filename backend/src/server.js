/**
 * Entry point du serveur Express.
 * Initialise middlewares globaux, routes et gestion d'erreurs.
 */

import express from "express";
import cors from "cors";
import 'dotenv/config';
import analyzeRoute from "./routes/analyze.route.js";

// dotenv.config();

const app = express();

/**
 * Middlewares globaux
 */
app.use(cors());
app.use(express.json({ limit: "1mb" }));

/**
 * Routes
 */
app.use("/analyze", analyzeRoute);

/**
 * Middleware global d'erreur
 * Doit être placé après les routes.
 */
// app.use(errorHandler);

const PORT = process.env.PORT || 4000;
console.log("process.env.GEMINI ", process.env.GEMINI_API_KEY);
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
