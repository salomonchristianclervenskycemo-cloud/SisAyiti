"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/ui/them-provider"
import { SessionProvider } from "@/components/providers/session-provider"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}
