'use client'

import { useToastStore } from '@/store/toast'

export default function Toast() {
  const { toasts, dismiss } = useToastStore()

  if (toasts.length === 0) return null

  const getStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      default:
        return 'bg-blue-500'
    }
  }

  return (
    <div className="fixed top-24 right-4 z-[200] space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getStyles(toast.type)} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[250px] animate-slide-in`}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => dismiss(toast.id)}
            className="text-white/80 hover:text-white"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}