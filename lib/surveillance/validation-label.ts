import type { ValidationStatus } from './types'

const STATUS_KEYS: Record<ValidationStatus, string> = {
  confirmé: 'surv.validation.confirmed',
  automatique: 'surv.validation.automatic',
  provisoire: 'surv.validation.provisional',
  révisé: 'surv.validation.revised',
}

export function resolveValidationStatus(
  rawStatus: ValidationStatus | null | undefined,
  reviewed?: boolean
): ValidationStatus {
  if (rawStatus) return rawStatus
  if (reviewed) return 'confirmé'
  return 'automatique'
}

export function validationStatusLabelKey(status: ValidationStatus): string {
  return STATUS_KEYS[status] ?? STATUS_KEYS.automatique
}
