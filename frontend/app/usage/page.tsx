"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Activity
} from "lucide-react"
import { useI18n } from "@/hooks/use-i18n"
import { useSaaS } from "@/hooks/use-saas"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export default function UsagePage() {
  const { t } = useI18n()
  const { plan, credits, usage, limits } = useSaaS()

  const stats = [
    {
      id: "credits",
      title: t('usage.credits'),
      value: credits,
      max: limits.credits,
      icon: Zap,
      color: "text-neon-cyan",
      bgColor: "bg-neon-cyan/10",
    },
    {
      id: "analyses",
      title: t('usage.analyses'),
      value: usage.analyses,
      max: limits.analyses,
      icon: Activity,
      color: "text-neon-emerald",
      bgColor: "bg-neon-emerald/10",
    },
    {
      id: "tests",
      title: t('usage.tests'),
      value: usage.tests,
      max: limits.tests,
      icon: Sparkles,
      color: "text-neon-indigo",
      bgColor: "bg-neon-indigo/10",
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('usage.title')}</h1>
            <p className="text-zinc-400 mt-1">{t('usage.desc')}</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900 border border-border rounded-xl">
            <ShieldCheck className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-medium uppercase tracking-wider">
              {t('pricing.current')}: <span className="text-neon-cyan">{plan}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {stats.map((stat, i) => {
            const percentage = Math.min((stat.value / stat.max) * 100, 100)
            const isNearLimit = percentage > 80

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-card/50 border-border/50 overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                        <stat.icon className={cn("w-5 h-5", stat.color)} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{stat.title}</CardTitle>
                        <CardDescription>
                          {stat.value} {t('usage.used')} {t('usage.of')} {stat.max}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        "text-2xl font-bold",
                        isNearLimit ? "text-neon-pink" : "text-white"
                      )}>
                        {Math.round(percentage)}%
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress 
                      value={percentage} 
                      className="h-2 bg-zinc-800"
                      indicatorClassName={cn(
                        "transition-all duration-500",
                        isNearLimit ? "bg-neon-pink shadow-[0_0_10px_rgba(255,0,255,0.5)]" : stat.id === 'credits' ? "bg-neon-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]" : stat.id === 'analyses' ? "bg-neon-emerald shadow-[0_0_10px_rgba(0,255,0,0.5)]" : "bg-neon-indigo shadow-[0_0_10px_rgba(128,0,255,0.5)]"
                      )}
                    />
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>0 {t('usage.used')}</span>
                      <span>{stat.max} {t('usage.limit')}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <Card className="bg-neon-cyan/5 border border-neon-cyan/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold">{t('usage.upgradePrompt')}</h3>
            <p className="text-zinc-400 text-sm">
              Unlock unlimited analyses, advanced security audits, and priority support.
            </p>
          </div>
          <Button variant="neon" className="shrink-0" asChild>
            <a href="/pricing">
              {t('pricing.upgrade')}
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  )
}