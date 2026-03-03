export function testAgentPrompt(refactoredCode) {
  return `
You are a senior QA automation engineer.

Generate Cypress E2E tests for the following code.

Return ONLY valid JSON:

{
  "test_code": "...",
  "coverage_explanation": "..."
}

Code:
${refactoredCode}
`;
}