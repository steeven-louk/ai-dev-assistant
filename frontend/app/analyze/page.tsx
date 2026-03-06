"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Code2, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Copy, 
  Check,
  Loader2,
  Sparkles,
  AlertCircle
} from "lucide-react"

// import ReactMarkdown from "react-markdown"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/hooks/use-i18n"
import { useSaaS } from "@/hooks/use-saas"
import { useAnalyzeCode } from "@/hooks/useAnalyzeCode"
import { CodeEditor } from "@/components/ui/code-editor"

export default function AnalyzePage() {
  const [code, setCode] = React.useState("")
  const [copied, setCopied] = React.useState(false)
  
  const { t } = useI18n()
  const { deductCredit, credits, plan } = useSaaS()
  const { mutate, isPending, data, error } = useAnalyzeCode()

  
  React.useEffect(() => {
    if (data) {
      Prism.highlightAll()
    }
  }, [data])

  const handleAnalyze = () => {
    // Validation
    if (code.trim().length < 10) {
      return
    }

    // Credit check
    if (!deductCredit("analyses")) {
      return
    }

    // Trigger mutation
    mutate({ code })

  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('analyze.title')}</h1>
            <p className="text-zinc-400 mt-1">{t('analyze.desc')}</p>
          </div>
          <div className="flex items-center gap-4">
            {plan === 'free' && (
              <span className="text-xs text-zinc-500 font-medium">
                {credits} credits remaining
              </span>
            )}
            <Button 
              variant="neon" 
              onClick={handleAnalyze} 
              disabled={isPending || !code.trim()}
              className="gap-2 px-8"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('analyze.analyzing')}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {t('analyze.run')}
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card/50 border-border/50 flex flex-col h-150 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-neon-cyan" />
                <CardTitle className="text-sm">{t('analyze.source')}</CardTitle>
              </div>
              {error && <span className="text-xs text-red-400 font-medium">{error.message}</span>}
            </CardHeader>
            <CardContent className="flex-1 p-0 border-t border-border/50 overflow-auto custom-scrollbar">
              <CodeEditor
                value={code}
                onChange={setCode}
                placeholder={t('analyze.placeholder')}
              />
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            {!data ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-center border-2 border-dashed border-border/50 rounded-xl h-150 bg-zinc-900/20"
              >
                <div className="text-center space-y-4 max-w-xs">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 border border-border flex items-center justify-center mx-auto">
                    <Zap className="w-8 h-8 text-zinc-600" />
                  </div>
                  <h3 className="text-lg font-medium">{t('analyze.ready')}</h3>
                  <p className="text-sm text-zinc-500">
                    {t('analyze.readyDesc')}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col h-150 space-y-6"
              >
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: t('analyze.scores.performance'), value: data?.analysis.complexity_score.performance, icon: Zap, color: "text-neon-cyan" },
                    { label: t('analyze.scores.security'), value: data?.analysis.complexity_score.security, icon: ShieldCheck, color: "text-neon-emerald" },
                    { label: t('analyze.scores.maintainability'), value: data?.analysis.complexity_score.maintainability, icon: Activity, color: "text-purple-400" },
                  ].map((score) => (
                    <Card key={score.label} className="bg-card/50 border-border/50">
                      <CardContent className="p-4 text-center">
                        <score.icon className={cn("w-5 h-5 mx-auto mb-2", score.color)} />
                        <p className="text-2xl font-bold">{score.value}</p>
                        <p className="text-[10px] text-zinc-500 uppercase font-bold">{score.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="flex-1 bg-card/50 border-border/50 flex flex-col overflow-hidden">
                  <Tabs defaultValue="refactor" className="flex flex-col h-full">
                    <CardHeader className="py-2 border-b border-border/50">
                      <TabsList className="w-full justify-start bg-transparent p-0">
                        <TabsTrigger value="refactor" className="data-[state=active]:bg-zinc-800/50">{t('analyze.tabs.refactor')}</TabsTrigger>
                        <TabsTrigger value="tests" className="data-[state=active]:bg-zinc-800/50">{t('analyze.tabs.tests')}</TabsTrigger>
                        <TabsTrigger value="issues" className="data-[state=active]:bg-zinc-800/50">{t('analyze.tabs.issues')}</TabsTrigger>
                      </TabsList>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden">
                      <TabsContent value="refactor" className="h-full m-0">
                        <div className="flex h-full overflow-hidden">
                          {/* Refactored Code */}
                          <div className="flex-1 relative border-r border-border/50">
                            <pre className="h-full p-6 m-0 overflow-auto custom-scrollbar text-sm font-mono">
                              <code className="language-typescript">
                                {data?.refactor.refactored_code}
                              </code>
                            </pre>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="absolute top-4 right-4 bg-zinc-900/80 hover:bg-zinc-800"
                              onClick={() => copyToClipboard(data?.refactor.refactored_code || "")}
                            >
                              {copied ? <Check className="w-4 h-4 text-neon-emerald" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                          
                          {/* Improvements Summary */}
                          <div className="w-80 border-l border-border/50 overflow-auto custom-scrollbar">
                            <div className="p-6 space-y-4">
                              <h4 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-neon-cyan" />
                                Improvements
                              </h4>
                              <div className="space-y-3">
                                {data?.refactor.improvements_summary.map((improvement: string, i: number) => (
                                  <div key={i} className="flex gap-3">
                              <div className="shrink-0 pt-1">
                                      <div className="flex items-center justify-center h-5 w-5 rounded-full bg-neon-emerald/10 text-neon-emerald">
                                        <Check className="w-3 h-3" />
                                      </div>
                                    </div>
                                    <p className="text-xs text-zinc-300 leading-relaxed">
                                      {improvement}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="tests" className="h-full m-0">
                        <div className="relative h-full">
                          <pre className="h-full p-6 m-0 overflow-auto custom-scrollbar text-sm font-mono">
                            <code className="language-typescript">
                              {data?.test.test_code}
                            </code>
                          </pre>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-4 right-4 bg-zinc-900/80 hover:bg-zinc-800"
                            onClick={() => copyToClipboard(data?.test.test_code || "")}
                          >
                            {copied ? <Check className="w-4 h-4 text-neon-emerald" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="issues" className="h-full m-0 p-6 overflow-auto custom-scrollbar">
                        <div className="space-y-4">
                          {data?.analysis.issues.map((issue, i: number) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 border border-border/50">
                              <div className={cn(
                                "p-2 rounded-lg",
                                issue.severity === 'high' ? 'bg-red-500/10 text-red-400' :
                                issue.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                                'bg-blue-500/10 text-blue-400'
                              )}>
                                <AlertCircle className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">{issue.type}</span>
                                  <span className={cn(
                                    "text-[10px] px-1.5 py-0.5 rounded border font-bold uppercase",
                                    issue.severity === 'high' ? 'border-red-500/20 text-red-400' :
                                    issue.severity === 'medium' ? 'border-yellow-500/20 text-yellow-400' :
                                    'border-blue-500/20 text-blue-400'
                                  )}>
                                    {issue.severity}
                                  </span>
                                </div>
                                <p className="text-sm text-zinc-300 mt-1">{issue.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </CardContent>
                  </Tabs>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  )
}