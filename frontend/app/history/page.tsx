"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Code2, 
  History as HistoryIcon, 
  Search, 
  Filter, 
  ArrowUpRight,
  Clock,
  Trash2
} from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const mockHistory = [
  { id: 1, name: "auth-service.ts", date: "2 hours ago", score: 92, status: "Optimized", type: "TypeScript" },
  { id: 2, name: "payment-gateway.js", date: "5 hours ago", score: 78, status: "Needs Review", type: "JavaScript" },
  { id: 3, name: "user-profile.tsx", date: "Yesterday", score: 85, status: "Tests Generated", type: "React" },
  { id: 4, name: "api-client.ts", date: "2 days ago", score: 95, status: "Optimized", type: "TypeScript" },
  { id: 5, name: "utils.js", date: "3 days ago", score: 64, status: "Critical Issues", type: "JavaScript" },
]

import { useI18n } from "@/hooks/use-i18n"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function HistoryPage() {
  const { t } = useI18n()
  const [history, setHistory] = React.useState(mockHistory)

  const clearHistory = () => {
    setHistory([])
  }

  const deleteItem = (id: number) => {
    setHistory(prev => prev.filter(item => item.id !== id))
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('history.title')}</h1>
            <p className="text-zinc-400 mt-1">{t('history.desc')}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 border-border/50">
              <Filter className="w-4 h-4" />
              {t('history.filter')}
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-border/50 text-red-400 hover:text-red-300 hover:bg-red-500/5">
                  <Trash2 className="w-4 h-4" />
                  {t('common.clearAll')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('history.clearConfirmTitle')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('history.clearConfirmDesc')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={clearHistory}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    {t('common.confirm')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="border-b border-border/50 py-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder={t('common.search')}
                className="w-full bg-zinc-900/50 border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 transition-all"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {history.length === 0 ? (
                <div className="p-12 text-center text-zinc-500">
                  {t('history.noHistory')}
                </div>
              ) : (
                history.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-6 hover:bg-zinc-900/30 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <div className="p-3 rounded-xl bg-zinc-900 border border-border group-hover:border-neon-cyan/30 transition-colors">
                        <Code2 className="w-6 h-6 text-zinc-400 group-hover:text-neon-cyan transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                            <Clock className="w-3 h-3" />
                            {item.date}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                            <HistoryIcon className="w-3 h-3" />
                            {item.type}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-12">
                      <div className="text-center">
                        <p className={cn(
                          "text-xl font-bold",
                          item.score >= 90 ? "text-neon-emerald" : 
                          item.score >= 75 ? "text-yellow-400" : "text-red-400"
                        )}>
                          {item.score}
                        </p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Score</p>
                      </div>

                      <div className="w-32">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-border">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            item.status === 'Optimized' ? 'bg-neon-emerald' : 
                            item.status === 'Critical Issues' ? 'bg-red-500' : 'bg-yellow-400'
                          )} />
                          <span className="text-xs font-medium text-zinc-400 truncate">{item.status}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
                          <ArrowUpRight className="w-5 h-5" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-400">
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>{t('history.deleteConfirmTitle')}</AlertDialogTitle>
                              <AlertDialogDescription>
                                {t('history.deleteConfirmDesc')}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteItem(item.id)}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                {t('common.delete')}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}