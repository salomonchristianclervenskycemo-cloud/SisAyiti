'use client'

import { Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { AuthPageShell } from '@/components/auth/auth-page-shell'
import { useLang } from '@/lib/lang-context'
import { authErrorKey } from '@/lib/auth-error-i18n'

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLang()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const error = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setErrorMessage(t(authErrorKey(result.error)))
      } else if (result?.ok) {
        router.push(callbackUrl)
      }
    } catch {
      setErrorMessage(t('auth.signin.genericError'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              SisAyiti
            </h1>
            <p className="text-muted-foreground">{t('auth.signin.title')}</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded p-4 mb-6">
              <p className="text-sm text-destructive">{t('auth.signin.invalid')}</p>
            </div>
          )}

          {errorMessage && (
            <div className="bg-destructive/10 border border-destructive/20 rounded p-4 mb-6">
              <p className="text-sm text-destructive">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t('auth.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                {t('auth.register.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('auth.signin.loading') : t('auth.signin.submit')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t('auth.signin.noAccount')}{' '}
              <Link href="/auth/register" className="text-primary hover:underline font-medium">
                {t('auth.signin.register')}
              </Link>
            </p>
          </div>

          <Link href="/" className="block mt-4 text-center text-sm text-muted-foreground hover:text-foreground">
            {t('auth.signin.backHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SignIn() {
  return (
    <AuthPageShell>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">…</div>}>
        <SignInForm />
      </Suspense>
    </AuthPageShell>
  )
}
