/**
 * Orchestrateur central.
 * Coordonne les différents agents dans un pipeline séquentiel.
 */

import { analyzerAgent } from "../agents/analyzer.agent.js";
import { refactorAgent } from "../agents/refactor.agent.js";
import { testAgent } from "../agents/test.agent.js";

export async function runPipeline(code) {
  /**
   * Étape 1 : Analyse du code
   */
  const analysis = await analyzerAgent(code);
console.log("analysis", analysis)
  const refactor = await refactorAgent(code, analysis);
console.log("refactor", refactor)
  const test = await testAgent(refactor.refactored_code);
// console.log("test", test)
  /**
   * À ce stade MVP :
   * On retourne uniquement l'analyse.
   * Les autres agents (refactor, test) seront ajoutés ensuite.
   */

  return {
    analysis,
    refactor,
    test
  };
}
