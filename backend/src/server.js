import express from "express";
import cors from "cors";
import 'dotenv/config';
import analyzeRoute from "./routes/analyze.route.js";
import testRoute from "./routes/test.route.js";
import helmet from "helmet";

const app = express();

/**
 * Middlewares globaux
 */
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json({ limit: "200kb" }));// Limite la taille des requêtes pour éviter les abus
app.use(helmet()); // Sécurise les en-têtes HTTP

/**
 * Routes
 */
app.use("/analyze", analyzeRoute);
app.use("/test", testRoute);


const PORT = process.env.API_PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
