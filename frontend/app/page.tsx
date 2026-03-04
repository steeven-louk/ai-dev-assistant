"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  ShieldCheck, 
  Activity, 
  Code2, 
  Plus, 
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"
import { useI18n } from "@/hooks/use-i18n"


const recentAnalyses = [
  { id: 1, name: "auth-service.ts", date: "2 hours ago", score: 92, status: "Optimized" },
  { id: 2, name: "payment-gateway.js", date: "5 hours ago", score: 78, status: "Needs Review" },
  { id: 3, name: "user-profile.tsx", date: "Yesterday", score: 85, status: "Tests Generated" },
]

// import { useI18n } from "@/hooks/use-i18n"

export default function HomePage() {
  const { t } = useI18n()
  
  const stats = [
    { label: "Analyses", value: "128", icon: Activity, color: "text-blue-400" },
    { label: "Optimizations", value: "42", icon: Zap, color: "text-neon-cyan" },
    { label: "Security Fixes", value: "15", icon: ShieldCheck, color: "text-neon-emerald" },
    { label: "Test Coverage", value: "84%", icon: CheckCircle2, color: "text-purple-400" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('common.welcome')}</h1>
            <p className="text-zinc-400 mt-1">{t('common.subtitle')}</p>
          </div>
          <Link href="/analyze">
            <Button variant="neon" className="gap-2">
              <Plus className="w-4 h-4" />
              {t('common.newAnalysis')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-card/50 border-border/50 hover:border-neon-cyan/30 transition-all duration-300">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-zinc-900/50 border border-border/50 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-card/50 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Analyses</CardTitle>
                <CardDescription>Your latest code improvements and insights.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnalyses.map((analysis) => (
                  <div 
                    key={analysis.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/30 border border-border/30 hover:bg-zinc-900/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-zinc-800 border border-border">
                        <Code2 className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{analysis.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-zinc-500" />
                          <span className="text-xs text-zinc-500">{analysis.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className={`text-sm font-bold ${analysis.score >= 90 ? 'text-neon-emerald' : 'text-yellow-400'}`}>
                          {analysis.score}/100
                        </p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Score</p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-border">
                        <div className={`w-1.5 h-1.5 rounded-full ${analysis.status === 'Optimized' ? 'bg-neon-emerald' : 'bg-yellow-400'}`} />
                        <span className="text-xs font-medium text-zinc-400">{analysis.status}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-neon-cyan transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Personalized tips for your stack.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-neon-indigo/5 border border-neon-indigo/20 space-y-2">
                <div className="flex items-center gap-2 text-neon-indigo">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Performance Tip</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Consider using <code className="text-neon-indigo font-mono">React.memo</code> for your heavy list components to reduce re-renders.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neon-emerald/5 border border-neon-emerald/20 space-y-2">
                <div className="flex items-center gap-2 text-neon-emerald">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Security Alert</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  We detected 3 dependencies with known vulnerabilities. Run <code className="text-neon-emerald font-mono">npm audit fix</code> to resolve.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Refactoring Needed</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Your <code className="text-red-400 font-mono">auth-service.ts</code> has a cyclomatic complexity of 12. Consider breaking it down.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}