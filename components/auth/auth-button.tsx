'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { LogIn, LogOut, User } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

const touchBtn =
  'inline-flex items-center justify-center gap-1.5 min-h-11 min-w-11 px-3 rounded-lg text-xs font-semibold transition-all duration-200'

export function AuthButton() {
  const { data: session, status } = useSession()
  const { t } = useLang()

  if (status === 'loading') {
    return (
      <span className={cn(touchBtn, 'text-muted-foreground')} aria-live="polite">
        {t('auth.loading')}
      </span>
    )
  }

  if (session?.user) {
    const name = session.user.name ?? session.user.email ?? t('auth.nav.profile')
    return (
      <div className="flex items-center gap-1">
        <span
          className={cn(touchBtn, 'text-muted-foreground cursor-default max-w-[120px] truncate')}
          title={name}
        >
          <User size={14} className="shrink-0" />
          <span className="truncate hidden sm:inline">{name}</span>
        </span>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className={cn(touchBtn, 'text-muted-foreground hover:text-foreground hover:bg-muted')}
          aria-label={t('auth.nav.signOut')}
        >
          <LogOut size={16} />
        </button>
      </div>
    )
  }

  return (
    <Link
      href="/auth/signin"
      className={cn(touchBtn, 'text-muted-foreground hover:text-foreground hover:bg-muted border border-border')}
      aria-label={t('auth.nav.signIn')}
    >
      <LogIn size={16} />
      <span className="hidden sm:inline">{t('auth.nav.signIn')}</span>
    </Link>
  )
}
