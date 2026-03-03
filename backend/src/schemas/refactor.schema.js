import { z } from "zod";

export const refactorOutputSchema = z.object({
  refactored_code: z.string(),// le code refactorisé
  improvements_summary: z.array(z.string())// Liste des améliorations apportées par la refactorisation
});