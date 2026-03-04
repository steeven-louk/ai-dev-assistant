"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Zap, Shield, Globe, Sparkles } from "lucide-react"
import { useI18n } from "@/hooks/use-i18n"
import { useSaaS, Plan } from "@/hooks/use-saas"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export default function PricingPage() {
  const { t } = useI18n()
  const { plan, setPlan } = useSaaS()

  const plans: { id: Plan; name: string; price: string; features: string[]; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
    {
      id: "free",
      name: t('pricing.free.name'),
      price: t('pricing.free.price'),
      features: t('pricing.free.features'),
      icon: Zap,
      color: "text-zinc-400",
    },
    {
      id: "pro",
      name: t('pricing.pro.name'),
      price: t('pricing.pro.price'),
      features: t('pricing.pro.features'),
      icon: Sparkles,
      color: "text-neon-cyan",
    },
    {
      id: "enterprise",
      name: t('pricing.enterprise.name'),
      price: t('pricing.enterprise.price'),
      features: t('pricing.enterprise.features'),
      icon: Shield,
      color: "text-neon-indigo",
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-12 py-8">
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            {t('pricing.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            {t('pricing.desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
            >
              <Card className={cn(
                "relative h-full bg-card/50 border-border/50 flex flex-col transition-all duration-300 hover:border-neon-cyan/30",
                plan === p.id && "border-neon-cyan/50 ring-1 ring-neon-cyan/50"
              )}>
                {plan === p.id && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-neon-cyan text-black text-[10px] font-bold uppercase rounded-full">
                    {t('pricing.current')}
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <div className={cn("w-12 h-12 rounded-2xl bg-zinc-900 border border-border flex items-center justify-center mx-auto mb-4", p.color)}>
                    <p.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl">{p.name}</CardTitle>
                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">${p.price}</span>
                    <span className="text-zinc-500 text-sm">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="space-y-3">
                    {p.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                        <Check className="w-4 h-4 text-neon-emerald shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-8">
                  <Button 
                    variant={plan === p.id ? "outline" : "neon"} 
                    className="w-full"
                    disabled={plan === p.id}
                    onClick={() => setPlan(p.id)}
                  >
                    {plan === p.id ? t('pricing.current') : t('pricing.upgrade')}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="bg-neon-indigo/5 border border-neon-indigo/20 p-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-neon-indigo">
            <Globe className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">{t('pricing.enterpriseSection.title')}</span>
          </div>
          <h3 className="text-2xl font-bold">{t('pricing.enterpriseSection.subtitle')}</h3>
          <p className="text-zinc-400 max-w-xl mx-auto">
            {t('pricing.enterpriseSection.desc')}
          </p>
          <Button variant="outline" className="border-neon-indigo/30 text-neon-indigo hover:bg-neon-indigo/10">
            {t('pricing.enterpriseSection.cta')}
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  )
}