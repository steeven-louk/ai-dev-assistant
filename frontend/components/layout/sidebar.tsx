"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Code2, 
  History, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  FileCode,
  CreditCard,
  Languages,
  BarChart3
} from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/hooks/use-i18n"
import { useSaaS } from "@/hooks/use-saas"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const pathname = usePathname()
  const { t, language, setLanguage } = useI18n()
  const { plan, credits, limits } = useSaaS()

  const menuItems = [
    { icon: LayoutDashboard, label: t('nav.overview'), href: "/" },
    { icon: Code2, label: t('nav.analyze'), href: "/analyze" },
    { icon: FileCode, label: t('nav.tests'), href: "/tests" },
    { icon: History, label: t('nav.history'), href: "/history" },
    { icon: BarChart3, label: t('nav.usage'), href: "/usage" },
    { icon: CreditCard, label: t('nav.pricing'), href: "/pricing" },
    { icon: Settings, label: t('nav.settings'), href: "/settings" },
  ]

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? "80px" : "260px" }}
      className="relative flex flex-col h-screen border-r border-border bg-card/50 backdrop-blur-xl transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center h-16 px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20">
            <Zap className="w-5 h-5 text-neon-cyan" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg tracking-tight neon-text-cyan">
              DevBoost AI
            </span>
          )}
        </Link>
      </div>

      <div className="flex-1 py-6 px-3 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                  isActive 
                    ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-neon-cyan" : "group-hover:text-white")} />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </div>
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-border space-y-4">
        {!isCollapsed && (
          <div className="px-3 py-2 rounded-lg bg-zinc-900/50 border border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-zinc-500">{t('pricing.current')}</span>
              <span className="text-[10px] uppercase font-bold text-neon-cyan">{plan}</span>
            </div>
            {plan !== 'enterprise' && (
              <div className="space-y-1">
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-cyan transition-all" 
                    style={{ width: `${(credits / limits.credits) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-zinc-500">{credits} / {limits.credits} {t('usage.credits')}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="flex-1 flex justify-center hover:bg-zinc-800/50 text-zinc-400"
          >
            <Languages className="w-4 h-4 mr-2" />
            {!isCollapsed && <span className="text-xs uppercase font-bold">{language}</span>}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex-1 flex justify-center hover:bg-zinc-800/50"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}