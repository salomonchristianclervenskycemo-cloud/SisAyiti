"use client"

import { cn } from "@/lib/utils"
import type { PlayerRole } from "@/shared/ville-game"
import { HardHat, Heart, Landmark } from "lucide-react"
import { useLang } from "@/lib/lang-context"
import { villeBtn, villeBtnActive } from "./civ1-theme"

const ROLES: { id: PlayerRole; icon: typeof HardHat; costKey: string }[] = [
  { id: "mayor", icon: Landmark, costKey: "ville.role.mayorCost" },
  { id: "civil", icon: Heart, costKey: "ville.role.civilCost" },
  { id: "engineer", icon: HardHat, costKey: "ville.role.engineerCost" },
]

export function RoleActionBar({
  role,
  onRoleChange,
}: {
  role: PlayerRole
  onRoleChange: (r: PlayerRole) => void
}) {
  const { t } = useLang()

  return (
    <div className="flex flex-col gap-1.5">
      {ROLES.map(({ id, icon: Icon, costKey }) => (
        <button
          key={id}
          type="button"
          onClick={() => onRoleChange(id)}
          className={cn(villeBtn, "w-full text-left flex items-center gap-2", role === id && villeBtnActive)}
        >
          <Icon size={14} className={role === id ? "text-primary" : "text-muted-foreground"} />
          <span className="flex-1 font-bold text-xs">{t(`ville.role.${id}`)}</span>
          <span className="text-[9px] text-muted-foreground">{t(costKey)}</span>
        </button>
      ))}
    </div>
  )
}
