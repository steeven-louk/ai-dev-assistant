/**
 * Client générique d'appel LLM.
 * Abstraction pour pouvoir changer de provider.
 */

import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({});
export async function callLLM(prompt) {
  // TODO: implémenter appel OpenAI / Anthropic
    const response = await ai.models.generateContent({
         model: "gemini-2.5-flash",
    contents: prompt,
        config: {
            responseMimeType: "application/json", // Demande un JSON en sortie
            // responseSchema: geminiSchema,       // Spécifie la structure JSON attendue
            temperature: 0.7, // Controle de la créativité
            // maxOutputTokens: 1500, // Limite de tokens pour la réponse
        }
    });

  return response.text;

//   return JSON.stringify({
//     issues: ["Example issue"],
//     security_risks: [],
//     performance_problems: ["Potential re-render loop"],
//     complexity_score: 60,
//   });
}
