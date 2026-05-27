# 📐 PLAN D'INGÉNIERIE COMPLET - SisAyiti Carte Sismique v2.0

**Date**: May 22, 2026  
**Version**: Engineering Design Document v1.0  
**Objectif**: Transformer la carte sismique en système professionnel de surveillance

---

## 🎯 VISION FINALE

Une carte sismique **professionnelle, scientifique et temps réel** qui:
- Affiche les données USGS/EMSC en direct
- Offre une interface moderne et intuitive
- Fournit des outils d'analyse avancés
- Performe même avec 1000+ événements
- Déploie en production avec 99.9% uptime

---

## 📊 ANALYSE ÉTAT ACTUEL

### ✅ Points Forts
- Leaflet.js avec animations fluides
- Design OKLCH cohérent
- Structure composants React solide
- Backend API fonctionnel
- PostgreSQL + Redis en place

### ❌ Limitations Actuelles
1. **Données statiques** - Hardcodées dans code
2. **Pas de temps réel** - Aucune intégration USGS
3. **Performances** - Lent avec 100+ marqueurs
4. **UX rudimentaire** - Filtres/légendes manquants
5. **PostGIS absent** - Pas de géospatial sophistiqué
6. **APIs externes** - Aucune intégration externe
7. **Caching naïf** - Redis peu utilisé pour la carte
8. **Monitoring** - Pas d'alertes temps réel

### 🔧 Dépendances Manquantes
```
- mapbox-gl (advanced mapping)
- axios (HTTP client)
- date-fns (date manipulation)
- recharts (analytics charts)
- postgis (spatial extension)
```

---

## 🏗️ ARCHITECTURE NOUVELLE

### Layer 1: Frontend (Présentation)
```
components/
├── carte-sismique-v2/
│   ├── map-container.tsx (Container principal)
│   ├── map-canvas.tsx (Mapbox rendu)
│   ├── sidebar-panel.tsx (Infos événement)
│   ├── legend-panel.tsx (Légende interactive)
│   ├── filter-panel.tsx (Filtres avancés)
│   ├── controls-panel.tsx (Zoom, style, layers)
│   ├── statistics-panel.tsx (Stats et alertes)
│   ├── event-card.tsx (Détail événement)
│   └── layer-toggle.tsx (On/off couches)
└── shared/
    ├── mini-chart.tsx (Graphiques petits)
    └── real-time-badge.tsx (Indicateur temps réel)
```

### Layer 2: State Management
```
lib/
├── seismic-store.ts (Zustand state)
├── map-context.tsx (Context API)
├── hooks/
│   ├── use-seismic-events.ts (Fetch + cache)
│   ├── use-map-filters.ts (Filter logic)
│   ├── use-real-time-updates.ts (WebSocket)
│   └── use-analytics.ts (Stats calculation)
```

### Layer 3: API / Backend
```
app/api/
├── seismic/
│   ├── events/route.ts (GET realtime)
│   ├── history/route.ts (GET filtered)
│   ├── stats/route.ts (GET analytics)
│   ├── alerts/route.ts (GET active)
│   └── layers/route.ts (GET geo-layers)
├── external/
│   ├── usgs-sync/route.ts (USGS integration)
│   ├── emsc-sync/route.ts (EMSC integration)
│   └── webhook/route.ts (Real-time updates)
└── admin/
    └── data-refresh/route.ts (Manual refresh)

lib/
├── seismic-service.ts (Business logic)
├── external-apis.ts (USGS, EMSC clients)
├── data-processor.ts (Transform + validate)
└── postgis-queries.ts (Spatial queries)
```

### Layer 4: Database (PostGIS)
```
prisma/
└── schema.prisma (NEW MODELS):
    ├── SeismicEvent (Real-time events)
    ├── SeismicHistory (Archive)
    ├── GeoZone (Regions, faults)
    ├── RealTimeAlert (Active alerts)
    ├── DataSource (API tracking)
    ├── MapLayer (Customizable layers)
    └── UserPreferences (Save filters)
```

### Layer 5: Infrastructure
```
services/
├── seismic-sync-service.ts (Background job)
├── websocket-handler.ts (Real-time push)
├── cache-strategy.ts (Redis optimization)
└── health-monitor.ts (Service health)
```

---

## 📋 PHASES D'IMPLÉMENTATION

### PHASE A: Nettoyage & Audit (2-3 heures)
**Objectif**: Code de qualité professionnelle

#### A1: Audit de Code
- [ ] Linter tous les fichiers
- [ ] Identifier code mort
- [ ] Vérifier imports orphelins
- [ ] Documenter dette technique

#### A2: Nettoyage
- [ ] Supprimer code inutilisé
- [ ] Organiser dossiers
- [ ] Standardiser imports
- [ ] Ajouter JSDoc manquantes

#### A3: Tests Existants
- [ ] Vérifier tous les builds
- [ ] Tester les API endpoints
- [ ] Vérifier Docker
- [ ] Documenter résultats

**Livrables**: 
- `AUDIT_CODE_REPORT.md`
- Code nettoyé et organisé
- All tests passing

---

### PHASE B: Backend - Données Temps Réel (4-5 heures)
**Objectif**: Intégration USGS + EMSC

#### B1: Dépendances & Configuration
```bash
npm install mapbox-gl axios date-fns recharts
npm install -D @types/mapbox-gl
```

#### B2: Modèles Prisma (PostGIS)
```prisma
model SeismicEvent {
  id String @id @default(cuid())
  usgsId String? @unique
  emscId String? @unique
  
  // Données scientifiques
  magnitude Float
  depth Float // km
  latitude Float
  longitude Float
  timestamp DateTime
  
  // Geospatial
  location Unsupported("geometry")? // PostGIS
  
  // Source & metadata
  source String // "USGS" | "EMSC" | "LOCAL"
  confidence Float // 0-1
  reviewed Boolean @default(false)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([timestamp])
  @@index([magnitude])
  @@index([source])
  @@index([latitude, longitude])
}

model GeoZone {
  id String @id @default(cuid())
  name String
  type String // "fault", "region", "zone"
  geometry Unsupported("geometry")?
  riskLevel String
  metadata Json?
  createdAt DateTime @default(now())
}

model RealTimeAlert {
  id String @id @default(cuid())
  eventId String?
  alertType String // "new_event", "magnitude_threshold"
  severity String // "low", "medium", "high", "critical"
  message String
  resolved Boolean @default(false)
  createdAt DateTime @default(now())
  resolvedAt DateTime?
}
```

#### B3: Services Externes
**Fichier**: `lib/external-apis.ts`
```typescript
// USGS Earthquake API
class USGSClient {
  async getRecentEarthquakes(days: number = 7) {
    // Fetch depuis https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/
  }
}

// EMSC API
class EMSCClient {
  async getRecentEvents(hours: number = 24) {
    // Fetch depuis https://www.seismicportal.eu/
  }
}

// Data Processor
class SeismicDataProcessor {
  async processUSGSData(rawData)
  async processEMSCData(rawData)
  async deduplicateEvents(events)
  async enrichWithHaitiData(events)
}
```

#### B4: API Routes Nouvelles
```
POST /api/external/usgs-sync - Fetch USGS
POST /api/external/emsc-sync - Fetch EMSC
GET /api/seismic/events?days=7&mag=5.0 - Real-time events
GET /api/seismic/stats - Analytics
POST /api/webhook/realtime - WebSocket updates
```

#### B5: Synchronisation Background
**Fichier**: `lib/seismic-sync-service.ts`
```typescript
// Cron job: Fetch all 5 minutes
- USGS: Derniers 7 jours
- EMSC: Dernières 24 heures
- Déduplicate + merge
- Cache Redis
- Broadcast WebSocket
```

**Livrables**:
- Prisma migrations PostGIS
- Intégration USGS + EMSC
- API endpoints temps réel
- Background sync service
- Redis caching strategy
- Documentation API

---

### PHASE C: Frontend - Migration Mapbox (5-6 heures)
**Objectif**: UI moderne professionnelle

#### C1: Installation Mapbox
```bash
npm install mapbox-gl @mapbox/mapbox-gl-draw
# Get free token ou use OSS alternative (OpenMapTiles)
```

#### C2: Composants Nouveaux
- [ ] `map-canvas.tsx` - Rendu Mapbox
- [ ] `filter-panel.tsx` - Filtres avancés
- [ ] `legend-panel.tsx` - Légende interactive
- [ ] `statistics-panel.tsx` - Analytics
- [ ] `event-card.tsx` - Détail enrichi
- [ ] `layer-toggle.tsx` - Gestion couches
- [ ] `controls-panel.tsx` - Outils carte

#### C3: Styling & Esthétique
**Style Mapbox Professionnel**:
```json
{
  "id": "earthquakes",
  "type": "circle",
  "paint": {
    "circle-radius": [
      "interpolate", ["linear"], ["get", "magnitude"],
      4, 4,
      8, 20
    ],
    "circle-color": [
      "match", ["get", "risk"],
      "critical", "#ff3333",
      "high", "#ff6b6b",
      "medium", "#ffb700",
      "#00f2ff"
    ],
    "circle-opacity": 0.8
  }
}
```

#### C4: Couches Géographiques
- [ ] Séismes temps réel
- [ ] Failles principales
- [ ] Zones de liquéfaction
- [ ] Zones de risque
- [ ] Infrastructure critique
- [ ] Régions administratives

#### C5: Filtres Avancés
```typescript
interface MapFilters {
  magnitude: { min: number; max: number };
  depth: { min: number; max: number };
  dateRange: { start: Date; end: Date };
  riskLevel: string[];
  sources: string[];
  customBounds: Bounds;
}
```

#### C6: Animations & Interactions
- Zoom fluide
- Hover sur événement
- Click pour détails
- Clustering automatique
- Heatmap option
- Timeline animation

**Livrables**:
- Composants Mapbox intégrés
- Filtres fonctionnels
- Styling professionnel
- Couches géo complètes
- Interactions fluides

---

### PHASE D: Optimisations Avancées (3-4 heures)
**Objectif**: Performance + UX

#### D1: Clustering
```typescript
// Cluster 1000+ marqueurs intelligemment
const clusterMap = mapboxgl.clustering({
  radius: 50,
  maxZoom: 14
});
```

#### D2: Caching Redis
```typescript
// Stratégie multi-tier
- Real-time: TTL 30s (WebSocket)
- Events: TTL 5min
- Stats: TTL 1hour
- History: TTL 24hours
```

#### D3: WebGL & Performance
- Utiliser WebGL pour 1000+ points
- Limit rendus à 60fps
- Lazy load données hors écran
- Optimize image sizes

#### D4: Heatmap & Density
```typescript
// Visualiser zones à risque
const heatmapLayer = {
  id: "seismic-density",
  type: "heatmap",
  paint: {
    "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 4, 0, 8, 1],
    "heatmap-radius": [50, 30, 25],
    "heatmap-opacity": 0.7
  }
};
```

#### D5: Analytics & Statistics
```typescript
interface SeismicStats {
  totalEvents: number;
  avgMagnitude: number;
  highestMagnitude: number;
  eventsLast24h: number;
  eventsLast7d: number;
  riskDistribution: Record<string, number>;
  topAffectedAreas: Array<{ area: string; count: number }>;
}
```

**Livrables**:
- Clustering efficace
- Heatmap option
- Analytics complets
- Performance 60fps

---

### PHASE E: Alerts & Real-Time (2-3 heures)
**Objectif**: Système d'alertes intelligent

#### E1: WebSocket Setup
```typescript
// server: Broadcast new events
// client: Listen for updates
const ws = new WebSocket("wss://sisayiti.app/ws/seismic");
```

#### E2: Alert Rules
```typescript
interface AlertRule {
  type: "magnitude" | "location" | "depth";
  condition: "> 5.5" | "near:18.539,-72.335";
  action: "notify" | "email" | "sms";
  enabled: boolean;
}
```

#### E3: Notifications
- Toast notification
- Sound alert
- Email delivery
- SMS via Twilio (optional)

**Livrables**:
- WebSocket server
- Alert system
- Notifications

---

### PHASE F: Documentation & Tests (3 heures)
**Objectif**: Production-ready

#### F1: Tests
- [ ] Unit tests (services)
- [ ] Integration tests (API)
- [ ] E2E tests (carte)
- [ ] Performance tests

#### F2: Documentation
- [ ] API docs (OpenAPI)
- [ ] Component docs (Storybook)
- [ ] Deployment guide
- [ ] Troubleshooting guide

#### F3: Monitoring
- [ ] Sentry setup
- [ ] Health endpoint
- [ ] Metrics collection
- [ ] Alerting

**Livrables**:
- Tests complets
- Documentation complète
- Monitoring en place

---

## 🛠️ OUTILS & DÉPENDANCES

### Nouvelles Dépendances
```json
{
  "dependencies": {
    "mapbox-gl": "^3.0.0",
    "axios": "^1.6.0",
    "date-fns": "^2.30.0",
    "recharts": "^2.10.0",
    "zustand": "^4.4.0",
    "decimal.js": "^10.4.0",
    "postgis": "latest"
  },
  "devDependencies": {
    "@mapbox/mapbox-gl-draw": "^1.3.0",
    "jest": "^29.0.0",
    "@testing-library/react": "^14.0.0"
  }
}
```

### Scripts NPM Nouveaux
```json
{
  "scripts": {
    "sync:usgs": "node scripts/sync-usgs.ts",
    "sync:emsc": "node scripts/sync-emsc.ts",
    "db:postgis": "psql -d sisayiti_dev -c 'CREATE EXTENSION IF NOT EXISTS postgis'",
    "map:test": "jest components/carte-sismique-v2",
    "map:storybook": "storybook dev -p 6006"
  }
}
```

---

## 📈 TIMELINE ESTIMÉE

| Phase | Durée | Total |
|-------|-------|-------|
| A: Audit & Nettoyage | 2-3h | 2.5h |
| B: Backend Temps Réel | 4-5h | 4.5h |
| C: Frontend Mapbox | 5-6h | 5.5h |
| D: Optimisations | 3-4h | 3.5h |
| E: Alerts Real-Time | 2-3h | 2.5h |
| F: Docs & Tests | 3h | 3h |
| **TOTAL** | | **~21.5 heures** |

**Estimée par développeur expérimenté**: 2-3 jours (8-12h/jour)

---

## ✅ CHECKPOINTS DE VALIDATION

### After Phase A
- [ ] Code lint 100% passing
- [ ] No console errors
- [ ] All imports clean
- [ ] Documentation updated

### After Phase B
- [ ] USGS API working
- [ ] EMSC API working
- [ ] Data stored in DB
- [ ] Cache strategy working
- [ ] API tests passing

### After Phase C
- [ ] Mapbox displaying
- [ ] Filters functional
- [ ] Layers toggling
- [ ] Styling complete
- [ ] Mobile responsive

### After Phase D
- [ ] Clustering 1000+ points
- [ ] 60fps performance
- [ ] Analytics accurate
- [ ] Heatmap rendering

### After Phase E
- [ ] WebSocket connected
- [ ] Alerts triggering
- [ ] Notifications working
- [ ] No message loss

### After Phase F
- [ ] 80%+ test coverage
- [ ] All docs written
- [ ] Monitoring active
- [ ] Ready for production

---

## 🎨 VISUAL TARGETS

### Map Features
✅ Satellite/Dark mode toggle  
✅ Real-time earthquake markers  
✅ Magnitude-based sizing  
✅ Risk-based coloring  
✅ Smooth animations  
✅ Clustering at zoom  
✅ Heatmap overlay  
✅ Fault lines visualization  
✅ Legend interactive  
✅ Filter panel  
✅ Statistics dashboard  
✅ Event detail panel  

### Color Scheme
```
Critical:   #ff3333 (Red)
High:       #ff6b6b (Orange-Red)
Medium:     #ffb700 (Amber)
Low:        #00f2ff (Cyan)
```

### Typography
```
Title:      Geist Bold 24px
Subtitle:   Geist 14px
Data:       Geist Mono 12px
```

---

## 🚀 DÉPLOIEMENT

### Pre-Production
1. Staging environment setup
2. Load testing (1000+ events)
3. Security audit
4. Performance profiling

### Production
1. Blue-green deployment
2. Zero downtime migration
3. Monitoring active
4. Rollback plan ready

### Post-Launch
1. Monitor error rates
2. Track user feedback
3. Weekly performance reviews
4. Monthly feature updates

---

## 📞 RÉFÉRENCES

### Documentation
- [Mapbox GL JS Docs](https://docs.mapbox.com/mapbox-gl-js/)
- [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/)
- [EMSC API](https://www.seismicportal.eu/)
- [PostGIS Docs](https://postgis.net/docs/)

### Tools
- Mapbox Studio: https://studio.mapbox.com/
- USGS Earthquake Hazards: https://earthquake.usgs.gov/
- EMSC: https://www.seismicportal.eu/

---

**Document Version**: 1.0  
**Last Updated**: May 22, 2026  
**Status**: ✅ Implemented (v2 — May 23, 2026)  
**Details**: See `SEISMIC_MAP_V2_STATUS.md`
