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
  issues: z.array(z.string()),
  security_risks: z.array(z.string()),
  performance_problems: z.array(z.string()),
  complexity_score: z.number().min(0).max(100),
});
