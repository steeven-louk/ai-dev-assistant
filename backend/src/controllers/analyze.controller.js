/**
 * Controller : couche intermédiaire entre la route et la logique métier.
 * Gère validation initiale et réponse HTTP.
 * Analyse le code soumis par l'utilisateur en orchestrant les agents analyzers.
 */

import { runPipeline } from "../services/orchestrator.service.js";
import { analysisInputSchema } from "../schemas/analysis.schemas.js";

export async function analyzeController(req, res, next) {
  try {
    /**
     * Validation stricte de l'input utilisateur
     */
    const parsed = analysisInputSchema.parse(req.body);

    /**
     * Exécution du pipeline agentique
     */
    const result = await runPipeline(parsed.code);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
