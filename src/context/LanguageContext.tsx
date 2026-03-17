import { createContext, useContext, useState, type ReactNode } from 'react'
import de from '../locales/de.json'
import en from '../locales/en.json'

type Language = 'de' | 'en'

type TranslationValue = string | Record<string, unknown>
type Translations = Record<string, TranslationValue>

const translations: Record<Language, Translations> = { de, en }

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getNestedValue(obj: Translations, path: string): string | undefined {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return undefined
    }
  }
  return typeof current === 'string' ? current : undefined
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem('lang') as Language | null
    return stored === 'en' || stored === 'de' ? stored : 'de'
  })

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('lang', newLang)
  }

  const t = (key: string, vars?: Record<string, string | number>): string => {
    let text = getNestedValue(translations[lang], key) ?? key
    if (vars) {
      for (const [varKey, value] of Object.entries(vars)) {
        text = text.replace(new RegExp(`\\{\\{${varKey}\\}\\}`, 'g'), String(value))
      }
    }
    return text
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
