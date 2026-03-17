import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useLanguage } from '../context/LanguageContext'

interface RateLimitToastProps {
  retryAfter: number
  toastId: string
}

export function RateLimitToast({ retryAfter, toastId }: RateLimitToastProps) {
  const [countdown, setCountdown] = useState(retryAfter)
  const { t } = useLanguage()

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          toast.dismiss(toastId)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [toastId])

  return (
    <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{t("rateLimit", { seconds: countdown })}</span>
    </div>
  )
}
