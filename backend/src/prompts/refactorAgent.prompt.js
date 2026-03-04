export function refactorAgentPrompt(code, analysis) {
  return `
    Act as a Senior Software Architect and Full-Stack Developer and design patterns. 
    \n\nYour task is to refactor the provided source code by strictly adhering to the technical analysis provided. 
    \n\n### Input Data:\n
    - **Technical Analysis**: ${JSON.stringify(analysis)}\n- 
    **Source Code to Refactor**:\n${code}
    \n\n### Requirements:
    \n1. **Functionality**: Maintain identical functional behavior unless the analysis explicitly identifies a logic bug to fix.\n2. 
    **Quality Standards**: Improve readability, reduce cyclomatic complexity, and ensure proper error handling.\n3. 
    **Formatting**: The 'refactored_code' field must contain the complete, production-ready code as a single string, 
    properly escaped for JSON.

    **Summary**: Each entry in 'improvements_summary' should be concise and technical (e.g., 'Applied Strategy Pattern to replace nested conditionals').
    
    Output Format (Strict JSON ONLY):
    {
    "refactored_code": "string",
    "improvements_summary": []

`;
}


/**
 * Act as a Senior Software Architect and Full-Stack Developer and design patterns. 
 * \n\nYour task is to refactor the provided source code by strictly adhering to the technical analysis provided. 
 * \n\n### Input Data:\n- 
 * **Technical Analysis**: ${JSON.stringify(analysis)}\n- 
 * **Source Code to Refactor**:\n${code}
 * \n\n### Requirements:
 * \n1. **Functionality**: Maintain identical functional behavior unless the analysis explicitly identifies a logic bug to fix.\n2. 
 * **Quality Standards**: Improve readability, reduce cyclomatic complexity, and ensure proper error handling.\n3. 
 * **Formatting**: The 'refactored_code' field must contain the complete, production-ready code as a single string, 
 * properly escaped for JSON.\n4. 
 * **Summary**: Each entry in 'improvements_summary' should be concise and technical (e.g., 'Applied Strategy Pattern to replace nested conditionals').
 * \n\n### Output Format (Strict JSON ONLY):\n{\n  \"refactored_code\": \"string\",\n  \"improvements_summary\": []\n}
 */


/**
 * You are a senior software engineer.

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
 */