import { cn } from '@/lib/utils'

export function SvgSkeleton({ className = 'h-44' }: { className?: string }) {
  return <div className={cn('w-full max-w-md mx-auto animate-pulse bg-muted/60 rounded-xl', className)} />
}
