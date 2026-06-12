import type { Lang, MapLang } from "@/shared/i18n"
import { toMapLang } from "@/shared/i18n"

export function toMapLocale(lang: Lang): MapLang {
  return toMapLang(lang)
}

export const mapTopBarT: Record<MapLang, Record<string, string>> = {
  fr: { title: "Carte sismique d'Haïti", subtitle: "Surveillance USGS / EMSC", active: "ACTIF", sync: "SYNC", lastUpdated: "Mis à jour", events: "événements" },
  ht: { title: "Kat tranblemanntè Ayiti", subtitle: "Veyans USGS / EMSC", active: "AKTIF", sync: "SENK", lastUpdated: "Dènye mizajou", events: "evènman" },
  en: { title: "Haiti seismic map", subtitle: "USGS / EMSC monitoring", active: "ACTIVE", sync: "SYNC", lastUpdated: "Updated", events: "events" },
  es: { title: "Mapa sísmico de Haití", subtitle: "Vigilancia USGS / EMSC", active: "ACTIVO", sync: "SYNC", lastUpdated: "Actualizado", events: "eventos" },
}

export const mapEventCardT: Record<MapLang, Record<string, string>> = {
  fr: { magnitude: "Magnitude", depth: "Profondeur", depthClass: "Classe de profondeur", risk: "Niveau de risque", coords: "Coordonnées (DD)", coordsDms: "Coordonnées (DMS)", source: "Source", time: "Date et heure", distance: "Distance", km: "km", inHaiti: "Dans la zone Haïti", outsideHaiti: "Hors zone principale", critical: "Critique", high: "Élevé", medium: "Modéré", low: "Faible", shallow: "Peu profond (0–30 km)", intermediate: "Intermédiaire (30–70 km)", deep: "Profond (70–150 km)", veryDeep: "Très profond (>150 km)", ago: "Il y a" },
  ht: { magnitude: "Magnitid", depth: "Pwofondè", depthClass: "Klas pwofondè", risk: "Nivo danje", coords: "Kòdone (DD)", coordsDms: "Kòdone (DMS)", source: "Sous", time: "Dat ak lè", distance: "Distans", km: "km", inHaiti: "Nan zòn Ayiti", outsideHaiti: "Deyò zòn prensipal", critical: "Kritik", high: "Wo", medium: "Modere", low: "Fèb", shallow: "Pa fon (0–30 km)", intermediate: "Entèmedyè (30–70 km)", deep: "Fon (70–150 km)", veryDeep: "Très fon (>150 km)", ago: "Gen" },
  en: { magnitude: "Magnitude", depth: "Depth", depthClass: "Depth class", risk: "Risk level", coords: "Coordinates (DD)", coordsDms: "Coordinates (DMS)", source: "Source", time: "Date and time", distance: "Distance", km: "km", inHaiti: "In Haiti zone", outsideHaiti: "Outside main zone", critical: "Critical", high: "High", medium: "Moderate", low: "Low", shallow: "Shallow (0–30 km)", intermediate: "Intermediate (30–70 km)", deep: "Deep (70–150 km)", veryDeep: "Very deep (>150 km)", ago: "Ago" },
  es: { magnitude: "Magnitud", depth: "Profundidad", depthClass: "Clase de profundidad", risk: "Nivel de riesgo", coords: "Coordenadas (DD)", coordsDms: "Coordenadas (DMS)", source: "Fuente", time: "Fecha y hora", distance: "Distancia", km: "km", inHaiti: "En zona Haití", outsideHaiti: "Fuera de zona principal", critical: "Crítico", high: "Alto", medium: "Moderado", low: "Bajo", shallow: "Superficial (0–30 km)", intermediate: "Intermedio (30–70 km)", deep: "Profundo (70–150 km)", veryDeep: "Muy profundo (>150 km)", ago: "Hace" },
}

export const mapBottomBarT: Record<MapLang, Record<string, string>> = {
  fr: { period: "Période", magnitude: "Magnitude min.", realtime: "Temps réel", on: "Activé", off: "Désactivé", days: "jours" },
  ht: { period: "Periòd", magnitude: "Magnitid min.", realtime: "Tan reyèl", on: "Aktive", off: "Dezaktive", days: "jou" },
  en: { period: "Period", magnitude: "Min. magnitude", realtime: "Real-time", on: "On", off: "Off", days: "days" },
  es: { period: "Período", magnitude: "Magnitud mín.", realtime: "Tiempo real", on: "Activado", off: "Desactivado", days: "días" },
}

export const mapLegendT: Record<MapLang, Record<string, string>> = {
  fr: { title: "Légende", risk: "Niveau de risque", depth: "Profondeur", magnitude: "Magnitude", clusters: "Regroupements", heatmap: "Carte de chaleur", liquefaction: "Liquéfaction" },
  ht: { title: "Lejann", risk: "Nivo danje", depth: "Pwofondè", magnitude: "Magnitid", clusters: "Gwoupman", heatmap: "Kat chalè", liquefaction: "Likifaksyon" },
  en: { title: "Legend", risk: "Risk level", depth: "Depth", magnitude: "Magnitude", clusters: "Clusters", heatmap: "Heatmap", liquefaction: "Liquefaction" },
  es: { title: "Leyenda", risk: "Nivel de riesgo", depth: "Profundidad", magnitude: "Magnitud", clusters: "Agrupaciones", heatmap: "Mapa de calor", liquefaction: "Licuefacción" },
}

export const mapEmptyT: Record<MapLang, Record<string, string>> = {
  fr: { title: "Aucun événement", hint: "Ajustez les filtres ou la période" },
  ht: { title: "Pa gen evènman", hint: "Ajiste filt yo oswa peryòd la" },
  en: { title: "No events", hint: "Adjust filters or time period" },
  es: { title: "Sin eventos", hint: "Ajuste filtros o período" },
}

export const realtimeBadgeT: Record<MapLang, { live: string; sync: string }> = {
  fr: { live: "TEMPS RÉEL", sync: "SYNC" },
  ht: { live: "TAN REYÈL", sync: "SENK" },
  en: { live: "REAL-TIME", sync: "SYNC" },
  es: { live: "TIEMPO REAL", sync: "SYNC" },
}

export const mapEventExtrasT: Record<MapLang, Record<string, string>> = {
  fr: { fallback: "Événement sismique", historical: "Événement historique (catalogue USGS)", tsunami: "Alerte tsunami possible", close: "Fermer", officialReport: "Fiche officielle" },
  ht: { fallback: "Evènman tranblemanntè", historical: "Evènman istorik (USGS)", tsunami: "Alèt tsunami posib", close: "Fèmen", officialReport: "Fich ofisyèl" },
  en: { fallback: "Seismic event", historical: "Historical event (USGS catalogue)", tsunami: "Possible tsunami alert", close: "Close", officialReport: "Official report" },
  es: { fallback: "Evento sísmico", historical: "Evento histórico (catálogo USGS)", tsunami: "Posible alerta de tsunami", close: "Cerrar", officialReport: "Ficha oficial" },
}

type PeriodKey = "1" | "7" | "30"
type MagKey = "all" | "3" | "4" | "5"

export const mapBottomBarFullT: Record<MapLang, {
  period: string
  magnitude: string
  realtime: string
  periods: Record<PeriodKey, string>
  mags: Record<MagKey, string>
}> = {
  fr: { period: "Période", magnitude: "Magnitude", realtime: "Temps réel", periods: { "1": "24 h", "7": "7 jours", "30": "30 jours" }, mags: { all: "Toutes", "3": "M ≥ 3", "4": "M ≥ 4", "5": "M ≥ 5" } },
  ht: { period: "Peryòd", magnitude: "Magnitid", realtime: "Tan reyèl", periods: { "1": "24 è", "7": "7 jou", "30": "30 jou" }, mags: { all: "Tout", "3": "M ≥ 3", "4": "M ≥ 4", "5": "M ≥ 5" } },
  en: { period: "Period", magnitude: "Magnitude", realtime: "Real-time", periods: { "1": "24 h", "7": "7 days", "30": "30 days" }, mags: { all: "All", "3": "M ≥ 3", "4": "M ≥ 4", "5": "M ≥ 5" } },
  es: { period: "Período", magnitude: "Magnitud", realtime: "Tiempo real", periods: { "1": "24 h", "7": "7 días", "30": "30 días" }, mags: { all: "Todas", "3": "M ≥ 3", "4": "M ≥ 4", "5": "M ≥ 5" } },
}

export const mapLegendOverlayT: Record<MapLang, Record<string, string>> = {
  fr: { legend: "Légende", magnitude: "Magnitude (taille)", depth: "Niveau de risque", faults: "Failles majeures", sept: "Septentrionale", enriq: "Enriquillo-PG" },
  ht: { legend: "Lejann", magnitude: "Magnitid (gwosè)", depth: "Nivo danje", faults: "Gwo fay", sept: "Septantriyonal", enriq: "Enriquillo-PG" },
  en: { legend: "Legend", magnitude: "Magnitude (size)", depth: "Risk level", faults: "Major faults", sept: "Septentrional", enriq: "Enriquillo-PG" },
  es: { legend: "Leyenda", magnitude: "Magnitud (tamaño)", depth: "Nivel de riesgo", faults: "Fallas principales", sept: "Septentrional", enriq: "Enriquillo-PG" },
}

export const mapFilterT: Record<MapLang, Record<string, string>> = {
  fr: { title: "Filtres", magMin: "Magnitude min", depthMax: "Profondeur max (km)", sources: "Sources de données" },
  ht: { title: "Filtre", magMin: "Magnitid min", depthMax: "Pwofondè max (km)", sources: "Sous done" },
  en: { title: "Filters", magMin: "Min. magnitude", depthMax: "Max depth (km)", sources: "Data sources" },
  es: { title: "Filtros", magMin: "Magnitud mín.", depthMax: "Profundidad máx. (km)", sources: "Fuentes de datos" },
}

export const mapControlsT: Record<MapLang, Record<string, string>> = {
  fr: { dark: "SOMBRE", satellite: "SATELLITE" },
  ht: { dark: "NWA", satellite: "SATELIT" },
  en: { dark: "DARK", satellite: "SATELLITE" },
  es: { dark: "OSCURO", satellite: "SATÉLITE" },
}

export const mapStatsT: Record<MapLang, Record<string, string>> = {
  fr: { loading: "Chargement stats…", title: "Statistiques (7j)", total: "Total" },
  ht: { loading: "Chaje estatistik…", title: "Estatistik (7j)", total: "Total" },
  en: { loading: "Loading stats…", title: "Statistics (7d)", total: "Total" },
  es: { loading: "Cargando estadísticas…", title: "Estadísticas (7d)", total: "Total" },
}

export const mapLegendPanelT: Record<MapLang, Record<string, string>> = {
  fr: { title: "Légende", critical: "Critique", high: "Élevé", medium: "Modéré", low: "Faible" },
  ht: { title: "Lejann", critical: "Kritik", high: "Wo", medium: "Modere", low: "Fèb" },
  en: { title: "Legend", critical: "Critical", high: "High", medium: "Moderate", low: "Low" },
  es: { title: "Leyenda", critical: "Crítico", high: "Alto", medium: "Moderado", low: "Bajo" },
}

export const mapLayerToggleT: Record<MapLang, { title: string; layers: Record<string, { label: string; desc: string }> }> = {
  fr: {
    title: "Couches cartographiques",
    layers: {
      earthquakes: { label: "Séismes", desc: "Points colorés par profondeur" },
      clusters: { label: "Regroupements", desc: "Clusters à faible zoom" },
      faults: { label: "Failles actives", desc: "Septentrionale et Enriquillo" },
      liquefaction: { label: "Liquéfaction", desc: "Zones à risque sol" },
      riskZones: { label: "Zones à risque", desc: "Polygones sismiques" },
      heatmap: { label: "Carte de chaleur", desc: "Densité d'activité" },
    },
  },
  ht: {
    title: "Kouch kat jeyografik",
    layers: {
      earthquakes: { label: "Tranblemanntè", desc: "Pwen koulè pa pwofondè" },
      clusters: { label: "Gwoupman", desc: "Gwoup nan zoom ba" },
      faults: { label: "Fay aktif", desc: "Septantriyonal ak Enriquillo" },
      liquefaction: { label: "Likifaksyon", desc: "Zòn danje tè" },
      riskZones: { label: "Zòn danje", desc: "Poligòn sismik" },
      heatmap: { label: "Kat chalè", desc: "Dansite aktivite" },
    },
  },
  en: {
    title: "Map layers",
    layers: {
      earthquakes: { label: "Earthquakes", desc: "Points colored by depth" },
      clusters: { label: "Clusters", desc: "Clusters at low zoom" },
      faults: { label: "Active faults", desc: "Septentrional and Enriquillo" },
      liquefaction: { label: "Liquefaction", desc: "Soil risk zones" },
      riskZones: { label: "Risk zones", desc: "Seismic polygons" },
      heatmap: { label: "Heatmap", desc: "Activity density" },
    },
  },
  es: {
    title: "Capas del mapa",
    layers: {
      earthquakes: { label: "Sismos", desc: "Puntos coloreados por profundidad" },
      clusters: { label: "Agrupaciones", desc: "Clusters con poco zoom" },
      faults: { label: "Fallas activas", desc: "Septentrional y Enriquillo" },
      liquefaction: { label: "Licuefacción", desc: "Zonas de riesgo de suelo" },
      riskZones: { label: "Zonas de riesgo", desc: "Polígonos sísmicos" },
      heatmap: { label: "Mapa de calor", desc: "Densidad de actividad" },
    },
  },
}

export const mapLoadingT: Record<MapLang, string> = {
  fr: "Chargement de la carte…",
  ht: "Chaje kat la…",
  en: "Loading map…",
  es: "Cargando mapa…",
}

export const mapEmptyFullT: Record<MapLang, Record<string, string>> = {
  fr: { title: "Aucun événement visible", hint: "Élargissez la période ou baissez le seuil de magnitude. Les données USGS sont utilisées si la base locale est indisponible." },
  ht: { title: "Pa gen evènman", hint: "Elaji peryòd la oswa diminye magnitid. Done USGS itilize si baz la pa disponib." },
  en: { title: "No visible events", hint: "Widen the period or lower the magnitude threshold. USGS data is used if the local database is unavailable." },
  es: { title: "Sin eventos visibles", hint: "Amplíe el período o baje el umbral de magnitud. Se usan datos USGS si la base local no está disponible." },
}

export const mapToolbarT: Record<MapLang, Record<string, string>> = {
  fr: { zoomIn: "Zoom avant", zoomOut: "Zoom arrière", centerHaiti: "Centrer Haïti", locateMe: "Ma position", geoDenied: "Géolocalisation refusée ou indisponible", geoUnsupported: "Géolocalisation non supportée", dark: "Fond sombre", satellite: "Satellite", layers: "Couches", filters: "Filtres", guide: "Guide pédagogique" },
  ht: { zoomIn: "Zoom an", zoomOut: "Zoom deyò", centerHaiti: "Santre Ayiti", locateMe: "Pozisyon mwen", geoDenied: "Jewolokalizasyon refize", geoUnsupported: "Jewolokalizasyon pa sipòte", dark: "Fond nwa", satellite: "Satelit", layers: "Kouch", filters: "Filtre", guide: "Gid pedagojik" },
  en: { zoomIn: "Zoom in", zoomOut: "Zoom out", centerHaiti: "Center Haiti", locateMe: "My location", geoDenied: "Geolocation denied or unavailable", geoUnsupported: "Geolocation not supported", dark: "Dark basemap", satellite: "Satellite", layers: "Layers", filters: "Filters", guide: "Learning guide" },
  es: { zoomIn: "Acercar", zoomOut: "Alejar", centerHaiti: "Centrar Haití", locateMe: "Mi ubicación", geoDenied: "Geolocalización denegada", geoUnsupported: "Geolocalización no soportada", dark: "Mapa oscuro", satellite: "Satélite", layers: "Capas", filters: "Filtros", guide: "Guía pedagógica" },
}

export const mapPopupT: Record<MapLang, Record<string, string>> = {
  fr: { historical: "Événement majeur historique", depth: "Profondeur", date: "Date (HT)", coords: "Coords", distance: "Distance PAP", source: "Source", inZone: "● Zone Haïti", outZone: "○ Périphérie régionale", hint: "Cliquer pour le panneau détaillé", fallback: "Haïti" },
  ht: { historical: "Evènman istorik majè", depth: "Pwofondè", date: "Dat (HT)", coords: "Kòdone", distance: "Distans PAP", source: "Sous", inZone: "● Zòn Ayiti", outZone: "○ Peryfèri", hint: "Klike pou plis detay", fallback: "Ayiti" },
  en: { historical: "Major historical event", depth: "Depth", date: "Date (HT)", coords: "Coords", distance: "Distance PAP", source: "Source", inZone: "● Haiti zone", outZone: "○ Regional periphery", hint: "Click for detail panel", fallback: "Haiti" },
  es: { historical: "Evento histórico mayor", depth: "Profundidad", date: "Fecha (HT)", coords: "Coords", distance: "Distancia PAP", source: "Fuente", inZone: "● Zona Haití", outZone: "○ Periferia regional", hint: "Clic para panel detallado", fallback: "Haití" },
}

export const mapRiskChipT: Record<MapLang, Record<string, string>> = {
  fr: { critical: "Critique", high: "Élevé", medium: "Modéré", low: "Faible" },
  ht: { critical: "Kritik", high: "Wo", medium: "Modere", low: "Fèb" },
  en: { critical: "Critical", high: "High", medium: "Moderate", low: "Low" },
  es: { critical: "Crítico", high: "Alto", medium: "Moderado", low: "Bajo" },
}
