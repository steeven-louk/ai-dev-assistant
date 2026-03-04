/**
 * Schémas Zod garantissant la validité des entrées
 * et des sorties LLM.
 */

import { z } from "zod";

/**
 * Input utilisateur
 */
export const analysisInputSchema = z.object({
  code: z.string().min(10, "Le snippet est trop court."),
});

/**
 * Output de l'agent Analyzer
 */
export const analysisOutputSchema = z.object({
  issues: z.array(z.object({
    type: z.enum(["performance", "security", "maintainability"]),
    message: z.string(),
    severity: z.enum(["low", "medium", "high"])
  })),
  security_risks: z.array(z.object({
    message: z.string()
  })),
  performance_problems: z.array(z.object({
    message: z.string()
  })),
  complexity_score: z.object({
    maintainability: z.number().min(0).max(100),
    security: z.number().min(0).max(100),
    performance: z.number().min(0).max(100)
  }),
});
