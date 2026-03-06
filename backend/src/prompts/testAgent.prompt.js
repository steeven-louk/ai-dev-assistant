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