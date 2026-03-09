"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  FileCode, 
  Copy, 
  Check,
  Loader2,
  Sparkles,
  FlaskConical,
  CheckCircle2,
} from "lucide-react"

import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-tsx"
import { motion, AnimatePresence } from "motion/react"
import { useI18n } from "@/hooks/use-i18n"
import { useSaaS } from "@/hooks/use-saas"
import { useGenerateTests } from "@/hooks/useGenerateTests"
import { CodeEditor } from "@/components/ui/code-editor"


export default function TestGeneratorPage() {
  const [code, setCode] = React.useState("")
  const [copied, setCopied] = React.useState(false)
  
  const { t } = useI18n()
  const { deductCredit, credits, plan } = useSaaS()
  const { mutate, isPending, data, error } = useGenerateTests()

  React.useEffect(() => {
    if (data) {
      Prism.highlightAll()
    }
  }, [data])

  const handleGenerateTests = () => {
    // Validation
    if (code.trim().length < 10) {
      return
    }

    // Credit check
    if (!deductCredit("tests")) {
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
            <h1 className="text-3xl font-bold tracking-tight">{t('nav.tests')}</h1>
            <p className="text-zinc-400 mt-1">{t('pricing.pro.features')[3]}</p>
          </div>
          <div className="flex items-center gap-4">
            {plan === 'free' && (
              <span className="text-xs text-zinc-500 font-medium">
                {credits} credits remaining
              </span>
            )}
            <Button 
              variant="neon" 
              onClick={handleGenerateTests} 
              disabled={isPending || !code.trim()}
              className="gap-2 px-8 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('analyze.analyzing')}
                </>
              ) : (
                <>
                  <FlaskConical className="w-4 h-4" />
                  {t('analyze.run')}
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card/50 border-border/50 flex flex-col h-150">
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-neon-cyan" />
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
                    <FlaskConical className="w-8 h-8 text-zinc-600" />
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
                className="flex flex-col h-200 space-y-6"
              >
                <Card className="flex-1 bg-card/50 border-border/50 flex flex-col overflow-hidden">
                  <CardHeader className="py-4 border-b border-border/50 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-neon-emerald" />
                      <CardTitle className="text-sm">Generated Test Suite</CardTitle>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-2 text-zinc-400 hover:text-white"
                      onClick={() => copyToClipboard(data?.test_code || "")}
                    >
                      {copied ? <Check className="w-4 h-4 text-neon-emerald" /> : <Copy className="w-4 h-4" />}
                      {copied ? t('common.copied') : t('common.copy')}
                    </Button>
                  </CardHeader>
                  <CardContent className="flex-1 p-0 overflow-hidden">
                    <div className="relative h-full">
                      <pre className="h-full p-6 m-0 overflow-auto custom-scrollbar text-sm font-mono">
                        <code>
                          {data?.test_code}
                        </code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-4 pl-1 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20  flex flex-col overflow-hidden">
                    <CardHeader className=" w-full p-2 h-full">
                        <div className="flex items-center gap-2">

                        <Sparkles className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                        <CardTitle className="text-sm font-bold text-neon-cyan uppercase ">Coverage Info</CardTitle>
                        </div>
                    </CardHeader>
                  <CardContent className="flex-1 p-0 ">
                    <div className="relative h-full">

                    <pre className=" text-zinc-300 h-full  p-6 m-0 overflow-auto custom-scrollbar text-sm font-mono">
                        <code >
                            {data?.coverage_explanation}
                        </code>
                      
                    </pre>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  )
}