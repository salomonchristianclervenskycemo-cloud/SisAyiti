'use client'

import { useSeismicStore } from '@/lib/seismic-store'
import { EventCard } from './event-card'
import type { Lang } from '@/lib/i18n'

export function SidebarPanel({ lang }: { lang: Lang }) {
  const selectedEvent = useSeismicStore((s) => s.selectedEvent)
  const setSelectedEvent = useSeismicStore((s) => s.setSelectedEvent)

  return (
    <div
      className={`absolute right-0 top-0 bottom-0 z-[1001] w-full md:w-96 bg-black/80 backdrop-blur-xl border-l border-cyan-500/30 shadow-2xl transform transition-transform duration-300 ${
        selectedEvent ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {selectedEvent && (
        <EventCard event={selectedEvent} lang={lang} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  )
}
