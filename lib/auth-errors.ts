/** Stable auth error codes for client-side i18n mapping. */
export const AUTH_ERROR = {
  MISSING_CREDENTIALS: "AUTH_MISSING_CREDENTIALS",
  USER_NOT_FOUND: "AUTH_USER_NOT_FOUND",
  INVALID_PASSWORD: "AUTH_INVALID_PASSWORD",
} as const

export type AuthErrorCode = (typeof AUTH_ERROR)[keyof typeof AUTH_ERROR]

export function isAuthErrorCode(msg: string): msg is AuthErrorCode {
  return Object.values(AUTH_ERROR).includes(msg as AuthErrorCode)
}
