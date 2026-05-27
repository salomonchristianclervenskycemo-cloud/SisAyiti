"use client"

export type { ModuleId } from "@/shared/types"
export { MODULE_SLUGS, moduleFromSlug, slugFromModule, isModuleId } from "@/shared/types"

import { createContext, useContext, useCallback, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { ModuleId } from "@/shared/types"
import { moduleFromSlug, slugFromModule } from "@/shared/types"

interface AppContextType {
  activeModule: ModuleId
  setActiveModule: (m: ModuleId) => void
}

const AppContext = createContext<AppContextType>({
  activeModule: "home",
  setActiveModule: () => {},
})

function resolveModuleFromPath(pathname: string): ModuleId {
  const slug = pathname.replace(/^\//, "").split("/")[0]
  return moduleFromSlug(slug || undefined) ?? "home"
}

export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const activeModule = resolveModuleFromPath(pathname)

  const setActiveModule = useCallback(
    (m: ModuleId) => {
      const href = slugFromModule(m)
      if (pathname !== href) router.push(href)
    },
    [router, pathname]
  )

  return (
    <AppContext.Provider value={{ activeModule, setActiveModule }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
