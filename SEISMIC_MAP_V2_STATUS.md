# Statut d'implémentation — Carte Sismique v2

**Date** : 23 mai 2026  
**Build** : ✅ `npm run build` réussi

## Phases complétées

| Phase | Statut | Détails |
|-------|--------|---------|
| A — Audit | ✅ | `AUDIT_CODE_REPORT.md` existant ; schéma Prisma nettoyé |
| B — Backend temps réel | ✅ | USGS/EMSC, sync 5 min, APIs, cache Redis |
| C — Frontend Mapbox | ✅ | `components/carte-sismique-v2/*` |
| D — Optimisations | ✅ | Clustering, heatmap, filtres, cache multi-TTL |
| E — Alertes temps réel | ✅ | SSE `/api/seismic/stream`, alertes DB, toasts navigateur |
| F — Tests & docs | ✅ | Build OK ; Jest configuré avec tests unitaires |

## APIs disponibles

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/seismic/events` | GET | Événements (DB + fallback USGS live) |
| `/api/seismic/stats` | GET | Statistiques agrégées |
| `/api/seismic/alerts` | GET | Alertes actives |
| `/api/seismic/history` | GET | Historique filtré |
| `/api/seismic/layers` | GET | GeoJSON failles / liquéfaction |
| `/api/seismic/stream` | GET | SSE temps réel |
| `/api/external/usgs-sync` | POST | Sync USGS manuelle |
| `/api/external/emsc-sync` | POST | Sync EMSC manuelle |
| `/api/admin/data-refresh` | POST | Refresh complet |

## Configuration

```env
DATABASE_URL=...
REDIS_URL=redis://localhost:6379
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=   # optionnel (fallback Carto)
```

## Commandes

```bash
npm run dev
npm run sync:all      # refresh manuel
npm run db:migrate    # appliquer le schéma
```

## PostGIS

Le schéma utilise des coordonnées `Float` indexées. L'extension PostGIS (`geometry`) reste optionnelle pour une phase ultérieure.
