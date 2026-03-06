"use client"

import { useMutation } from "@tanstack/react-query"
import { generateTests } from "@/lib/api"

export function useGenerateTests() {
  const mutation = useMutation({
    mutationFn: generateTests,
    retry: 2,
  })

  return mutation
}
