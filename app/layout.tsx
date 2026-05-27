import type { Metadata } from "next"
import { cookies } from "next/headers"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProviders } from "@/components/providers/app-providers"
import { LANG_COOKIE_KEY, isValidLang, type Lang } from "@/shared/i18n"
import { siteMetadataByLang } from "@/lib/site-metadata"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

async function resolveLang(): Promise<Lang> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(LANG_COOKIE_KEY)?.value
  return raw && isValidLang(raw) ? raw : "fr"
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await resolveLang()
  const meta = siteMetadataByLang[lang]
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      languages: {
        fr: "/",
        ht: "/",
        en: "/",
        es: "/",
      },
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const lang = await resolveLang()
  const htmlLang = lang === "kr" ? "ht" : lang

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <AppProviders>{children}</AppProviders>
        <div id="seismic-live-region" aria-live="polite" aria-atomic="true" className="sr-only" />
      </body>
    </html>
  )
}
