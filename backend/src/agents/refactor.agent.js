import { callLLM } from "../utils/llmClient.js";
import { refactorOutputSchema } from "../schemas/refactor.schema.js";
import { refactorAgentPrompt } from "../prompts/refactorAgent.prompt.js";
import { extractJSON } from "../utils/jsonExtractor.js";

export async function refactorAgent(code, analysis) {
  const prompt = refactorAgentPrompt(code, analysis);

  const rawResponse = await callLLM(prompt);

  const parsed = extractJSON(rawResponse);

  return refactorOutputSchema.parse(parsed);
}