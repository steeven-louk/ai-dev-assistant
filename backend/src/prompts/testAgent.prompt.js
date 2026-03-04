export function testAgentPrompt(refactoredCode) {
  return `
  Act as a Senior Cypress Specialist. Generate professional E2E tests for the code below.

### Constraints:. 
**No Superfluous Code**: Use direct Cypress commands. Avoid redundant boilerplate. 
**Readability**: Include concise, professional comments explaining the 'why' of complex assertions. 
**Naming**: Use clear, descriptive 'it' blocks and selector strategies (data-cy preferred).

### Input (Refactored Code): ${refactoredCode}

### Output Format (Strict JSON):
{
"test_code": "Concise Cypress script",
"coverage_explanation": "Brief technical summary of tested scenarios."
}

`;
}

/***
 * Act as a Senior Cypress Specialist. Generate professional E2E tests for the code below.\n\n
 * ### Constraints:\n1. **No Superfluous Code**: Use direct Cypress commands. Avoid redundant boilerplate.\n2. **Readability**: Include concise, professional comments explaining the 'why' of complex assertions.\n3. 
 * **Naming**: Use clear, descriptive 'it' blocks and selector strategies (data-cy preferred).\n\n
 * ### Input (Refactored Code):\n${refactoredCode}\n\n
 * ### Output Format (Strict JSON):\n{\n  \"test_code\": \"// Concise Cypress script\",\n  \"coverage_explanation\": \"Brief technical summary of tested scenarios.\"\n},
 */

/**
 * 
You are a senior QA automation engineer.

Generate Cypress E2E tests for the following code.

Return ONLY valid JSON:

{
  "test_code": "...",
  "coverage_explanation": "..."
}

Code:
${refactoredCode}
 */