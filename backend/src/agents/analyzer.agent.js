/**
 * Agent spécialisé dans l'analyse de code.
 * Responsable :
 * - Construction du prompt
 * - Appel LLM
 * - Validation sortie
 * - Retry si nécessaire
 */

import { analyzeAgentPrompt } from "../prompts/analyzeAgent.prompt.js";
import { analysisOutputSchema } from "../schemas/analysis.schemas.js";
import { extractJSON } from "../utils/jsonExtractor.js";
import { callLLM } from "../utils/llmClient.js";

export async function analyzerAgent(code) {

  const rawResponse = await callLLM(analyzeAgentPrompt(code));

  /**
   * Parse JSON
   */
  const parsed = extractJSON(rawResponse);

  /**
   * Validation stricte
   */
  return analysisOutputSchema.parse(parsed);
}
