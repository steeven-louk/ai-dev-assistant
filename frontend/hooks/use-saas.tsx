"use client"

import * as React from "react"

export type Plan = "free" | "pro" | "enterprise"

interface PlanLimits {
  credits: number
  analyses: number
  tests: number
}

const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: { credits: 5, analyses: 5, tests: 2 },
  pro: { credits: 100, analyses: 100, tests: 50 },
  enterprise: { credits: 1000, analyses: 1000, tests: 500 },
}

interface Usage {
  analyses: number
  tests: number
}

interface SaaSContextType {
  plan: Plan
  credits: number
  usage: Usage
  limits: PlanLimits
  setPlan: (plan: Plan) => void
  deductCredit: (action?: keyof Usage) => boolean
}

const SaaSContext = React.createContext<SaaSContextType | undefined>(undefined)

export function SaaSProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = React.useState<Plan>("free")
  const [credits, setCredits] = React.useState(5)
  const [usage, setUsage] = React.useState<Usage>({ analyses: 0, tests: 0 })

  const limits = PLAN_LIMITS[plan]

  const deductCredit = (action?: keyof Usage) => {
    // Enterprise has effectively unlimited for demo purposes, but we still track
    if (credits > 0 || plan === "enterprise") {
      if (plan !== "enterprise") {
        setCredits(prev => prev - 1)
      }
      
      if (action) {
        setUsage(prev => ({
          ...prev,
          [action]: prev[action] + 1
        }))
      }
      return true
    }
    return false
  }

  return (
    <SaaSContext.Provider value={{ plan, credits, usage, limits, setPlan, deductCredit }}>
      {children}
    </SaaSContext.Provider>
  )
}

export function useSaaS() {
  const context = React.useContext(SaaSContext)
  if (!context) throw new Error("useSaaS must be used within SaaSProvider")
  return context
}