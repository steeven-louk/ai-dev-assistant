/**
 * Extrait le premier bloc JSON valide d'une string.
 * Protège contre pollution texte LLM.
 */

export function extractJSON(text) {
  if (!text) {
    throw new Error("Empty LLM response");
  }

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No JSON object found in response");// Protection contre réponses non JSON
  }

  const jsonString = text.slice(firstBrace, lastBrace + 1);// Extraction du bloc JSON

  try {
    return JSON.parse(jsonString);
  } catch (err) {
    throw new Error("Invalid JSON format from LLM");
  }
}