/**
 * Orchestrateur central.
 * Coordonne les différents agents dans un pipeline séquentiel.
 */

import { analyzerAgent } from "../agents/analyzer.agent.js";
import { refactorAgent } from "../agents/refactor.agent.js";
import { testAgent } from "../agents/test.agent.js";

export async function runPipeline(code) {

  const analysis = await analyzerAgent(code);

  const refactor = await refactorAgent(code, analysis);

  const test = await testAgent(refactor.refactored_code);

  return {
    analysis,
    refactor,
    test
  };
}
