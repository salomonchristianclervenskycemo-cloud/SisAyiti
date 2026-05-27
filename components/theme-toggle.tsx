'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg',
        'transition-all duration-300 ease-out',
        'border border-border hover:border-primary/50',
        isDark 
          ? 'bg-secondary/60 hover:bg-secondary/80 shadow-sm hover:shadow-md' 
          : 'bg-muted/40 hover:bg-muted/60 shadow-sm hover:shadow-md',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
        'focus:ring-offset-background',
        'hover:scale-105 active:scale-95',
        'text-sm font-medium'
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Current: ${isDark ? 'Dark' : 'Light'} mode • Click to toggle`}
    >
      {/* Background animation indicator */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg transition-opacity duration-300',
          'opacity-0 group-hover:opacity-100'
        )}
      />
      
      {/* Sun Icon */}
      <Sun
        size={18}
        className={cn(
          'relative transition-all duration-300 ease-out',
          isDark
            ? 'rotate-90 scale-0 opacity-0 text-muted-foreground'
            : 'rotate-0 scale-100 opacity-100 text-foreground'
        )}
        aria-hidden="true"
      />
      
      {/* Moon Icon */}
      <Moon
        size={18}
        className={cn(
          'absolute transition-all duration-300 ease-out',
          isDark
            ? 'rotate-0 scale-100 opacity-100 text-primary'
            : '-rotate-90 scale-0 opacity-0 text-muted-foreground'
        )}
        aria-hidden="true"
      />

      {/* Text label - optional, can be hidden on mobile */}
      <span className={cn(
        'hidden sm:inline text-xs font-semibold transition-colors duration-300',
        isDark ? 'text-primary' : 'text-foreground/70'
      )}>
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}
