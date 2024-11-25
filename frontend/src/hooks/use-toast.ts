import { useState } from 'react'

interface Toast {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  return {
    toasts,
    // Add additional toast methods as needed
  }
} 