"use client"

import * as React from "react"
import { Sidebar } from "./sidebar"
import { Search, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useI18n } from "@/hooks/use-i18n"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { t } = useI18n()
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-border bg-card/30 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-neon-cyan transition-colors" />
              <input
                type="text"
                placeholder={t('common.search')}
                className="w-full bg-zinc-900/50 border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-border flex items-center justify-center">
              <User className="w-4 h-4 text-zinc-400" />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </main>
        <footer className="h-10 border-t border-border bg-card/30 backdrop-blur-md flex justify-between items-center  px-8 z-10">
          <span className="text-sm text-zinc-500">&copy; 2026 DevBoost AI. All rights reserved.</span>
          <span className="text-center">by <i>@steeven loukanou</i></span>
        </footer>
      </div>
    </div>
  )
}