import express from "express";
import cors from "cors";
import 'dotenv/config';
import analyzeRoute from "./routes/analyze.route.js";
import testRoute from "./routes/test.route.js";

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
app.use("/test", testRoute);


const PORT = process.env.API_PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
