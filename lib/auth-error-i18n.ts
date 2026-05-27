import { AUTH_ERROR, isAuthErrorCode } from "@/lib/auth-errors"

const AUTH_ERROR_KEYS: Record<string, string> = {
  [AUTH_ERROR.MISSING_CREDENTIALS]: "auth.error.missingCredentials",
  [AUTH_ERROR.USER_NOT_FOUND]: "auth.error.userNotFound",
  [AUTH_ERROR.INVALID_PASSWORD]: "auth.error.invalidPassword",
}

export function authErrorKey(message: string): string {
  if (isAuthErrorCode(message)) return AUTH_ERROR_KEYS[message] ?? "auth.signin.invalid"
  return "auth.signin.invalid"
}
