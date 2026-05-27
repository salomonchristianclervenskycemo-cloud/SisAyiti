// Minimal Toast Component (placeholder)
export interface Toast {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type ToastActionElement = React.ReactElement<any>

export interface ToastProps extends Toast {
  action?: ToastActionElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Toast = ({ id, title, description, open, onOpenChange }: ToastProps) => {
  return (
    <div className="fixed bottom-0 right-0 p-4 bg-gray-900 text-white rounded">
      {title && <div className="font-bold">{title}</div>}
      {description && <div className="text-sm">{description}</div>}
    </div>
  )
}
