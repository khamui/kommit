import { useLanguage } from '../context/LanguageContext'

interface FilterBarProps {
  languages: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export function FilterBar({ languages, selected, onChange }: FilterBarProps) {
  const { t } = useLanguage()
  const toggleLanguage = (lang: string) => {
    if (selected.includes(lang)) {
      onChange(selected.filter((l) => l !== lang))
    } else {
      onChange([...selected, lang])
    }
  }

  if (languages.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {languages.map((lang) => {
        const isSelected = selected.includes(lang)
        return (
          <button
            key={lang}
            onClick={() => toggleLanguage(lang)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              isSelected
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {lang}
          </button>
        )
      })}
      {selected.length > 0 && (
        <button
          onClick={() => onChange([])}
          className="px-3 py-1 text-sm rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          {t("filter.clear")}
        </button>
      )}
    </div>
  )
}
