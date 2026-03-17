import { useLanguage } from '../context/LanguageContext'

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      <button
        onClick={() => setLang('de')}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
          lang === 'de'
            ? 'bg-white dark:bg-gray-700 shadow-sm'
            : 'hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        DE
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
          lang === 'en'
            ? 'bg-white dark:bg-gray-700 shadow-sm'
            : 'hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        EN
      </button>
    </div>
  )
}
