import { callLLM } from "../utils/llmClient.js";
import { testOutputSchema } from "../schemas/test.schema.js";
import { testAgentPrompt } from "../prompts/testAgent.prompt.js";
import { extractJSON } from "../utils/jsonExtractor.js";

export async function testAgent(refactoredCode) {
  const prompt = testAgentPrompt(refactoredCode);

  const rawResponse = await callLLM(prompt);

  const parsed = extractJSON(rawResponse);

  return testOutputSchema.parse(parsed);
}