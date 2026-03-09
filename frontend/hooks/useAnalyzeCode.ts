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