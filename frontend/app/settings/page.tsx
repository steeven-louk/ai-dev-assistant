"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useI18n } from "@/hooks/use-i18n"
import { 
  User, 
  Bell, 
  Shield, 
  Key, 
  Globe, 
  Cpu,
  Save,
  Languages
} from "lucide-react"

export default function SettingsPage() {
  const { t, language, setLanguage } = useI18n()

  const navItems = [
    { label: t('settings.profile'), icon: User, active: true },
    { label: t('settings.notifications'), icon: Bell },
    { label: t('settings.security'), icon: Shield },
    { label: t('settings.apiKeys'), icon: Key },
    { label: t('settings.integrations'), icon: Globe },
    { label: t('settings.aiModel'), icon: Cpu },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('settings.title')}</h1>
          <p className="text-zinc-400 mt-1">{t('settings.desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 px-4 py-2 text-sm font-medium",
                  item.active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>{t('settings.profileInfo')}</CardTitle>
                <CardDescription>{t('settings.profileDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">{t('settings.fullName')}</label>
                    <input
                      type="text"
                      defaultValue="Developer"
                      className="w-full bg-zinc-900 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neon-cyan/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">{t('settings.email')}</label>
                    <input
                      type="email"
                      defaultValue="dev@boost.ai"
                      className="w-full bg-zinc-900 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neon-cyan/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">{t('settings.bio')}</label>
                  <textarea
                    rows={4}
                    defaultValue="Senior Fullstack Developer passionate about AI and productivity tools."
                    className="w-full bg-zinc-900 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>{t('settings.language')}</CardTitle>
                <CardDescription>{t('settings.languageDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant={language === 'en' ? 'neon' : 'outline'}
                    className="flex-1 gap-2"
                    onClick={() => setLanguage('en')}
                  >
                    <Languages className="w-4 h-4" />
                    English
                  </Button>
                  <Button
                    variant={language === 'fr' ? 'neon' : 'outline'}
                    className="flex-1 gap-2"
                    onClick={() => setLanguage('fr')}
                  >
                    <Languages className="w-4 h-4" />
                    Français
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>{t('settings.aiConfig')}</CardTitle>
                <CardDescription>{t('settings.aiConfigDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">{t('settings.defaultModel')}</label>
                  <select className="w-full bg-zinc-900 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neon-cyan/50">
                    <option>Gemini 3.1 Pro (Recommended)</option>
                    <option>Gemini 3 Flash (Fast)</option>
                    <option>Gemini 2.5 Flash (Legacy)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-neon-cyan">{t('settings.autoRefactor')}</p>
                    <p className="text-xs text-zinc-400">{t('settings.autoRefactorDesc')}</p>
                  </div>
                  <div className="w-10 h-5 bg-neon-cyan/20 rounded-full relative cursor-pointer border border-neon-cyan/30">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-neon-cyan rounded-full shadow-sm" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline" className="border-border/50">{t('common.cancel')}</Button>
              <Button variant="neon" className="gap-2">
                <Save className="w-4 h-4" />
                {t('common.save')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}