/**
 * Client générique d'appel LLM.
 * Abstraction pour pouvoir changer de provider.
 */

import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({});
export async function callLLM(prompt) {
  // TODO: implémenter appel Google GenAi ici
    const response = await ai.models.generateContent({
         model: "gemini-2.5-flash",
    contents: prompt,
        config: {
            responseMimeType: "application/json", // Demande un JSON en sortie
            temperature: 0.7, // Controle de la créativité
        }
    });

  return response.text;
}
