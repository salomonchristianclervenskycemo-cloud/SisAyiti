"use client"

import { FilterX, Search, WifiOff } from "lucide-react"
import { useLang } from "@/lib/lang-context"
import { ModuleEmptyState } from "@/components/ui/module-empty-state"

type Variant = "filtered" | "no-data" | "error"

type Props = {
  variant: Variant
  onClearFilters?: () => void
  onRetry?: () => void
  className?: string
}

export function SurveillanceEmptyState({
  variant,
  onClearFilters,
  onRetry,
  className,
}: Props) {
  const { t } = useLang()

  const title =
    variant === "error"
      ? t("surv.status.error")
      : variant === "filtered"
        ? t("act.noEvents")
        : t("surv.status.noEvents")

  const hint =
    variant === "error"
      ? t("act.errorHint")
      : variant === "filtered"
        ? t("act.emptyFilteredHint")
        : t("act.emptyDataHint")

  const icon = variant === "error" ? WifiOff : variant === "filtered" ? Search : FilterX

  return (
    <ModuleEmptyState
      variant={variant === "error" ? "error" : "default"}
      title={title}
      hint={hint}
      icon={icon}
      className={className}
      primaryAction={
        onRetry
          ? { label: t("act.retry"), onClick: onRetry }
          : undefined
      }
      secondaryAction={
        variant === "filtered" && onClearFilters
          ? { label: t("act.clearFilters"), onClick: onClearFilters }
          : undefined
      }
    />
  )
}
