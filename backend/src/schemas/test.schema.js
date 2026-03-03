import { z } from "zod";

export const testOutputSchema = z.object({
  test_code: z.string(),
  coverage_explanation: z.string()
});