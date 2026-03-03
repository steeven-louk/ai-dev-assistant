export function refactorAgentPrompt(code, analysis) {
  return `
You are a senior software engineer.

Based on the following analysis:

${JSON.stringify(analysis)}

Refactor the code below.

Return ONLY valid JSON:

{
  "refactored_code": "...",
  "improvements_summary": []
}

Code:
${code}
`;
}