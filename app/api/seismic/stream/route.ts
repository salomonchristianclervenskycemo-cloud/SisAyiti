import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const encoder = new TextEncoder()
  let lastCheck = new Date()

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      send({ type: 'connected', timestamp: new Date().toISOString() })

      const interval = setInterval(async () => {
        try {
          const newEvents = await prisma.seismicEvent.findMany({
            where: { createdAt: { gt: lastCheck } },
            orderBy: { createdAt: 'desc' },
            take: 20,
          })

          if (newEvents.length > 0) {
            lastCheck = new Date()
            send({ type: 'events', events: newEvents })
          } else {
            send({ type: 'heartbeat', timestamp: new Date().toISOString() })
          }
        } catch {
          send({ type: 'error', message: 'poll failed' })
        }
      }, 30000)

      request.signal.addEventListener('abort', () => {
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
