'use client'

import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { AuthPageShell } from '@/components/auth/auth-page-shell'
import { useLang } from '@/lib/lang-context'

export default function Register() {
  const { t } = useLang()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!formData.name || !formData.email || !formData.password) {
      setError(t('auth.register.allRequired'))
      return
    }

    if (formData.password.length < 8) {
      setError(t('auth.register.passwordShort'))
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.register.passwordMismatch'))
      return
    }

    setIsLoading(true)
    const { email, password } = formData

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email,
          password,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || t('auth.register.failed'))
      }

      setSuccess(true)
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })

      setTimeout(() => {
        signIn('credentials', {
          email,
          password,
          redirect: true,
          callbackUrl: '/',
        })
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.register.failed'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthPageShell>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                SisAyiti
              </h1>
              <p className="text-muted-foreground">{t('auth.register.title')}</p>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded p-4 mb-6">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/20 rounded p-4 mb-6">
                <p className="text-sm text-green-600 dark:text-green-400">{t('auth.register.success')}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('auth.register.name')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('auth.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">{t('auth.register.minChars')}</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  {t('auth.register.confirm')}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('auth.register.loading') : t('auth.register.submit')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t('auth.register.hasAccount')}{' '}
                <Link href="/auth/signin" className="text-primary hover:underline font-medium">
                  {t('auth.signin.submit')}
                </Link>
              </p>
            </div>

            <Link href="/" className="block mt-4 text-center text-sm text-muted-foreground hover:text-foreground">
              {t('auth.signin.backHome')}
            </Link>
          </div>
        </div>
      </div>
    </AuthPageShell>
  )
}
