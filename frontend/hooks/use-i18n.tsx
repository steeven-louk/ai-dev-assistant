/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"

type Language = "en" | "fr"

type Translations = {
  [key in Language]: {
    [key: string]: string | any
  }
}

const translations: Translations = {
  en: {
    nav: {
      overview: "Overview",
      analyze: "Analyze Code",
      tests: "Test Generator",
      history: "History",
      settings: "Settings",
      pricing: "Pricing",
      usage: "Usage",
    },
    common: {
      search: "Search analysis, code, or docs...",
      newAnalysis: "New Analysis",
      welcome: "Welcome back, Developer",
      subtitle: "Here's what's happening with your code today.",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save Changes",
      copy: "Copy",
      copied: "Copied",
      clearAll: "Clear All",
      delete: "Delete",
    },
    analyze: {
      title: "Code Analyzer",
      desc: "Paste your code below to get AI-powered insights and refactorings.",
      run: "Run Analysis",
      analyzing: "Analyzing...",
      source: "Source Code",
      placeholder: "// Paste your code here...",
      ready: "Ready for Analysis",
      readyDesc: "Your analysis results, refactored code, and tests will appear here once you click \"Run Analysis\".",
      scores: {
        performance: "Performance",
        security: "Security",
        maintainability: "Maintainability",
      },
      tabs: {
        refactor: "Refactoring",
        tests: "Tests",
        issues: "Issues",
      }
    },
    history: {
      title: "Analysis History",
      desc: "Review and manage your previous code analyses.",
      filter: "Filter",
      noHistory: "No history found.",
      clearConfirmTitle: "Are you absolutely sure?",
      clearConfirmDesc: "This action cannot be undone. This will permanently delete your entire analysis history.",
      deleteConfirmTitle: "Delete Analysis?",
      deleteConfirmDesc: "Are you sure you want to delete this analysis? This action cannot be undone.",
    },
    pricing: {
      title: "Choose Your Plan",
      desc: "Scale your productivity with our tailored offers.",
      free: {
        name: "Free",
        price: "0",
        features: ["5 analyses / month", "Basic refactoring", "Community support"],
      },
      pro: {
        name: "Pro",
        price: "29",
        features: ["Unlimited analyses", "Advanced security audit", "Priority support", "Test generation"],
      },
      enterprise: {
        name: "Enterprise",
        price: "99",
        features: ["Custom AI models", "Team collaboration", "Dedicated account manager", "SSO & Security"],
      },
      upgrade: "Upgrade Now",
      current: "Current Plan",
      enterpriseSection: {
        title: "Enterprise Solutions",
        subtitle: "Need a custom plan for your team?",
        desc: "Get in touch with our sales team for custom quotas, dedicated support, and on-premise deployments.",
        cta: "Contact Sales",
      }
    },
    usage: {
      title: "Usage & Limits",
      desc: "Monitor your current consumption against your plan's quotas.",
      credits: "Credits",
      analyses: "Code Analyses",
      tests: "Test Generations",
      remaining: "remaining",
      used: "used",
      of: "of",
      limit: "limit",
      upgradePrompt: "Need more? Upgrade your plan for higher limits.",
    },
    settings: {
      title: "Settings",
      desc: "Manage your account, preferences, and API integrations.",
      profile: "Profile",
      notifications: "Notifications",
      security: "Security",
      apiKeys: "API Keys",
      integrations: "Integrations",
      aiModel: "AI Model",
      profileInfo: "Profile Information",
      profileDesc: "Update your personal details and avatar.",
      fullName: "Full Name",
      email: "Email Address",
      bio: "Bio",
      aiConfig: "AI Configuration",
      aiConfigDesc: "Choose your preferred AI model and parameters.",
      defaultModel: "Default Model",
      autoRefactor: "Auto-Refactor on Paste",
      autoRefactorDesc: "Automatically start analysis when code is pasted.",
      language: "Language",
      languageDesc: "Choose your preferred interface language.",
    }
  },
  fr: {
    nav: {
      overview: "Vue d'ensemble",
      analyze: "Analyser le Code",
      tests: "Générateur de Tests",
      history: "Historique",
      settings: "Paramètres",
      pricing: "Tarifs",
      usage: "Utilisation",
    },
    common: {
      search: "Rechercher analyse, code ou docs...",
      newAnalysis: "Nouvelle Analyse",
      welcome: "Bon retour, Développeur",
      subtitle: "Voici ce qui se passe avec votre code aujourd'hui.",
      cancel: "Annuler",
      confirm: "Confirmer",
      save: "Enregistrer",
      copy: "Copier",
      copied: "Copié",
      clearAll: "Tout effacer",
      delete: "Supprimer",
    },
    analyze: {
      title: "Analyseur de Code",
      desc: "Collez votre code ci-dessous pour obtenir des optimisations IA.",
      run: "Lancer l'Analyse",
      analyzing: "Analyse en cours...",
      source: "Code Source",
      placeholder: "// Collez votre code ici...",
      ready: "Prêt pour l'Analyse",
      readyDesc: "Vos résultats d'analyse, code refactorisé et tests apparaîtront ici après avoir cliqué sur \"Lancer l'Analyse\".",
      scores: {
        performance: "Performance",
        security: "Sécurité",
        maintainability: "Maintenabilité",
      },
      tabs: {
        refactor: "Refactoring",
        tests: "Tests",
        issues: "Problèmes",
      }
    },
    history: {
      title: "Historique des Analyses",
      desc: "Consultez et gérez vos analyses de code précédentes.",
      filter: "Filtrer",
      noHistory: "Aucun historique trouvé.",
      clearConfirmTitle: "Êtes-vous absolument sûr ?",
      clearConfirmDesc: "Cette action est irréversible. Cela supprimera définitivement tout votre historique d'analyse.",
      deleteConfirmTitle: "Supprimer l'analyse ?",
      deleteConfirmDesc: "Êtes-vous sûr de vouloir supprimer cette analyse ? Cette action est irréversible.",
    },
    pricing: {
      title: "Choisissez Votre Plan",
      desc: "Boostez votre productivité avec nos offres sur mesure.",
      free: {
        name: "Gratuit",
        price: "0",
        features: ["5 analyses / mois", "Refactoring de base", "Support communautaire"],
      },
      pro: {
        name: "Pro",
        price: "29",
        features: ["Analyses illimitées", "Audit de sécurité avancé", "Support prioritaire", "Génération de tests"],
      },
      enterprise: {
        name: "Entreprise",
        price: "99",
        features: ["Modèles IA personnalisés", "Collaboration d'équipe", "Gestionnaire de compte dédié", "SSO & Sécurité"],
      },
      upgrade: "Mettre à niveau",
      current: "Plan Actuel",
      enterpriseSection: {
        title: "Solutions Entreprise",
        subtitle: "Besoin d'un plan personnalisé pour votre équipe ?",
        desc: "Contactez notre équipe commerciale pour des quotas sur mesure, un support dédié et des déploiements sur site.",
        cta: "Contacter les Ventes",
      }
    },
    usage: {
      title: "Utilisation & Limites",
      desc: "Surveillez votre consommation actuelle par rapport aux quotas de votre forfait.",
      credits: "Crédits",
      analyses: "Analyses de Code",
      tests: "Générations de Tests",
      remaining: "restants",
      used: "utilisés",
      of: "sur",
      limit: "limite",
      upgradePrompt: "Besoin de plus ? Améliorez votre forfait pour des limites plus élevées.",
    },
    settings: {
      title: "Paramètres",
      desc: "Gérez votre compte, vos préférences et vos intégrations API.",
      profile: "Profil",
      notifications: "Notifications",
      security: "Sécurité",
      apiKeys: "Clés API",
      integrations: "Intégrations",
      aiModel: "Modèle IA",
      profileInfo: "Informations du Profil",
      profileDesc: "Mettez à jour vos informations personnelles et votre avatar.",
      fullName: "Nom Complet",
      email: "Adresse Email",
      bio: "Bio",
      aiConfig: "Configuration IA",
      aiConfigDesc: "Choisissez votre modèle IA préféré et ses paramètres.",
      defaultModel: "Modèle par Défaut",
      autoRefactor: "Auto-Refactor au Coller",
      autoRefactorDesc: "Lancer l'analyse automatiquement lors du collage du code.",
      language: "Langue",
      languageDesc: "Choisissez votre langue d'interface préférée.",
    }
  }
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => any
}

const I18nContext = React.createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>("en")

  const t = (path: string) => {
    return path.split('.').reduce((obj, key) => obj?.[key], translations[language] as any) || path
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = React.useContext(I18nContext)
  if (!context) throw new Error("useI18n must be used within I18nProvider")
  return context
}
