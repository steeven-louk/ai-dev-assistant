import rateLimit from "express-rate-limit";

/**
 * Limite à 20 requêtes par IP toutes les 15 minutes
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    error: "Too many requests. Please try again later."
  }
});