import type maplibregl from 'maplibre-gl'

/** Exécute une action une fois le style chargé et les tuiles/glyphes prêts (évite crash MapLibre sur text-field). */
export function runWhenMapReady(map: maplibregl.Map, fn: () => void): void {
  const run = () => {
    try {
      if (!map.getStyle()) return
      fn()
    } catch (err) {
      console.warn('[map] Setup différé échoué:', err)
    }
  }

  const onIdle = () => run()

  const schedule = () => {
    if (map.loaded()) onIdle()
    else map.once('idle', onIdle)
  }

  if (map.isStyleLoaded()) schedule()
  else {
    map.once('styledata', () => {
      if (map.isStyleLoaded()) schedule()
    })
  }
}
