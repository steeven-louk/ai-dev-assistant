/**
 * Prompt pour analyser le code d'un agent et identifier les problèmes potentiels, les risques de sécurité, les problèmes de performance et calculer un score de complexité.
 * Ce prompt est utilisé par l'agent Analyzer pour structurer sa réponse de manière cohérente et facilement analysable.
 */
export function analyzeAgentPrompt(code) {
  return `
You are a senior software architect.

Analyze the following code and return ONLY a valid JSON:

{
  "issues": [],
  "security_risks": [],
  "performance_problems": [],
  "complexity_score": number
}

Code:
${code}
`};