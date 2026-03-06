import { testAgent } from "../agents/test.agent.js";
import { analysisInputSchema } from "../schemas/analysis.schemas.js";

export async function testController(req, res, next) {
  try {
    /**
     * Validation stricte de l'input utilisateur
     */
    const parsed = analysisInputSchema.parse(req.body);

    const result = await testAgent(parsed.code);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}