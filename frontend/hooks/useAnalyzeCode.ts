/**
 * Custom Hook: useAnalyzeCode
 * TanStack Query integration for code analysis
 * Handles mutations, loading states, errors, and caching
 */

"use client"

import { useMutation } from "@tanstack/react-query"
import { analyzeCode } from "@/lib/api"

export function useAnalyzeCode() {
  const mutation = useMutation({
    mutationFn: analyzeCode,
    retry: 2,// Retry failed requests up to 2 times
  })

  return mutation
}
