/**
 * Real-time transport abstraction — web uses EventSource; RN can use polling/WebSocket.
 */

import type { SeismicStreamPayload } from "@/shared/api-contract"
import { API_ROUTES } from "@/shared/api-contract"

export type RealtimeMessageHandler = (payload: SeismicStreamPayload) => void

export interface RealtimeTransport {
  connect(onMessage: RealtimeMessageHandler, onStatus: (connected: boolean) => void): () => void
}

/** Browser SSE implementation. */
export class EventSourceTransport implements RealtimeTransport {
  constructor(private url = API_ROUTES.seismicStream) {}

  connect(onMessage: RealtimeMessageHandler, onStatus: (connected: boolean) => void): () => void {
    if (typeof EventSource === "undefined") {
      onStatus(false)
      return () => {}
    }

    const source = new EventSource(this.url)
    source.onopen = () => onStatus(true)
    source.onerror = () => onStatus(false)
    source.onmessage = (msg) => {
      try {
        onMessage(JSON.parse(msg.data) as SeismicStreamPayload)
      } catch {
        /* ignore malformed */
      }
    }

    return () => {
      source.close()
      onStatus(false)
    }
  }
}

/** Default web transport. */
export const defaultRealtimeTransport = new EventSourceTransport()
