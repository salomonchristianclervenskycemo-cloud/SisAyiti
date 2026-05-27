'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AuthPageShell } from '@/components/auth/auth-page-shell'
import { useLang } from '@/lib/lang-context'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const { t } = useLang()
  const error = searchParams.get('error')

  const errorKeys: Record<string, string> = {
    CredentialsSignin: 'auth.signin.invalid',
    EmailSigninError: 'auth.errorPage.generic',
    Callback: 'auth.errorPage.generic',
    OAuthSignin: 'auth.errorPage.generic',
    OAuthCallback: 'auth.errorPage.generic',
    EmailCreateAccount: 'auth.errorPage.generic',
    SessionCallback: 'auth.errorPage.generic',
    EmailSignInError: 'auth.errorPage.generic',
  }

  const message = t(errorKeys[error as string] ?? 'auth.errorPage.generic')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-destructive mb-2">{t('auth.errorPage.title')}</h1>
            <p className="text-muted-foreground">{message}</p>
          </div>

          {error === 'CredentialsSignin' && (
            <div className="bg-destructive/10 border border-destructive/20 rounded p-4 mb-6">
              <p className="text-sm text-destructive">{t('auth.errorPage.credentials')}</p>
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/auth/signin"
              className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-md text-center hover:bg-primary/90 transition-colors"
            >
              {t('auth.errorPage.backSignin')}
            </Link>
            <Link
              href="/auth/register"
              className="block w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-center hover:bg-secondary/90 transition-colors"
            >
              {t('auth.errorPage.createAccount')}
            </Link>
            <Link
              href="/"
              className="block w-full px-4 py-2 bg-muted text-muted-foreground rounded-md text-center hover:bg-muted/80 transition-colors"
            >
              {t('auth.errorPage.home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthError() {
  return (
    <AuthPageShell>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">…</div>}>
        <AuthErrorContent />
      </Suspense>
    </AuthPageShell>
  )
}
