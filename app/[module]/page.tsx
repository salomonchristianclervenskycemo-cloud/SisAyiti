import { notFound } from 'next/navigation'
import { AppShell } from '@/components/app-shell'
import { moduleFromSlug } from '@/shared/types'

type Props = { params: Promise<{ module: string }> }

export default async function ModulePage({ params }: Props) {
  const { module: slug } = await params
  if (!moduleFromSlug(slug)) notFound()
  return <AppShell />
}
