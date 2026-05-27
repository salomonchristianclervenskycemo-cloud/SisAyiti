# 🎯 PROMPT ENGINEERING EXÉCUTIF - Amélioration SisAyiti

**Version**: 1.0  
**Date**: May 22, 2026  
**Priorité**: PHASE IMMÉDIATE  
**Temps Estimé**: 20-25 heures (2-3 jours)

---

## 📌 OBJECTIF GLOBAL EN UNE PHRASE

**Transformer la carte sismique SisAyiti d'un prototype statique en un système professionnel temps réel avec données USGS/EMSC, interface Mapbox moderne, et performances optimisées.**

---

## 🚀 STRUCTURE EXÉCUTIVE (5 Phases Séquentielles)

### PHASE 1: AUDIT & NETTOYAGE (2-3h) - SÉQUENCE A

**Objectif**: Code de production-quality

#### Step 1.1 - Code Audit & Linting
```bash
# Lancer ESLint sur tout
npm run lint 2>&1 | tee lint-report.txt

# Vérifier TypeScript
npx tsc --noEmit

# OUTCOME ATTENDU:
# - Fichier lint-report.txt généré
# - 0 erreurs TypeScript
# - Points à corriger listés
```

**Points à vérifier**:
- [ ] Imports orphelins identifiés
- [ ] Variables inutilisées listées
- [ ] Code dead detecté
- [ ] Dépendances non-utilisées repérées

#### Step 1.2 - Code Fixes Auto
```bash
# Fix auto les issues ESLint
npx eslint . --fix

# Après cela, review manuel:
# - leaflet-map.tsx (300 lignes, refactor)
# - module-carte.tsx (400 lignes, refactor)
# - module-ville.tsx (500 lignes, refactor)
```

**Cibles fixes**:
- [ ] Refactoriser createGlowIcon() duplication
- [ ] Extraire animations en file séparé
- [ ] Ajouter JSDoc manquantes
- [ ] Normaliser naming conventions

#### Step 1.3 - Documentation Code Gaps
```typescript
// Identifier et documenter:

// 1. lib/app-context.tsx - Add usage example
// 2. lib/lang-context.tsx - Document i18n pattern
// 3. middleware.ts - Add flow diagram
// 4. prisma/seed.ts - Add comments
```

**Validation**:
```bash
# Commit changes
git add .
git commit -m "Phase A: Code audit & linting cleanup"
npm run build  # Should pass with 0 errors
npm run lint   # Should have 0 issues (or noted)
```

---

### PHASE 2: BACKEND - TEMPS RÉEL (4-5h) - SÉQUENCE B

**Objectif**: Intégrer USGS + EMSC, PostGIS, Real-time sync

#### Step 2.1 - Installer Dépendances Nécessaires
```bash
# Cartographie avancée
npm install mapbox-gl @mapbox/mapbox-gl-draw

# HTTP client
npm install axios

# Utilities
npm install date-fns decimal.js

# Analytics/UI
npm install recharts zustand

# Types
npm install -D @types/mapbox-gl

# PostGIS (database extension)
# Note: Extension, pas npm package - faire dans DB

# Validation
npm install zod  # Already there

# Cleanup/Verify
npm ls  # Check for conflicts
npm audit  # Security check
```

**After**:
- [ ] All packages installed
- [ ] No conflicts reported
- [ ] `npm run build` succeeds

#### Step 2.2 - Database: PostGIS Setup
```bash
# Étape 1: Activer PostGIS dans database existante
# (Dans psql or pgAdmin):
# CREATE EXTENSION IF NOT EXISTS postgis;
# CREATE EXTENSION IF NOT EXISTS postgis_topology;

# Étape 2: Créer nouvelle migration Prisma
npm run db:migrate --name "Add PostGIS extensions"

# Migration file to create: prisma/migrations/[timestamp]_add_postgis/migration.sql
```

**migration.sql content**:
```sql
-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Create SeismicEvent table
CREATE TABLE seismic_events (
  id TEXT PRIMARY KEY,
  usgs_id TEXT UNIQUE,
  emsc_id TEXT UNIQUE,
  magnitude FLOAT,
  depth FLOAT,
  latitude FLOAT,
  longitude FLOAT,
  location geometry(Point, 4326),
  timestamp TIMESTAMP,
  source TEXT,
  confidence FLOAT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create spatial index
CREATE INDEX idx_seismic_location ON seismic_events USING GIST(location);
CREATE INDEX idx_seismic_timestamp ON seismic_events(timestamp DESC);
```

#### Step 2.3 - Prisma Schema Upgrade
```prisma
// File: prisma/schema.prisma

// ADD NEW MODELS:

model SeismicEvent {
  id String @id @default(cuid())
  
  // External IDs
  usgsId String? @unique
  emscId String? @unique
  
  // Scientific data
  magnitude Float
  depth Float          // km
  latitude Float
  longitude Float
  
  // PostGIS location (REQUIRED for spatial queries)
  location Unsupported("geometry")?
  
  // Timing
  timestamp DateTime
  
  // Metadata
  source String      // "USGS" | "EMSC" | "LOCAL"
  confidence Float   // 0.0-1.0
  reviewed Boolean @default(false)
  
  // Audit
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Indexes
  @@index([timestamp])
  @@index([magnitude])
  @@index([source])
  @@index([latitude, longitude])
}

model GeoZone {
  id String @id @default(cuid())
  name String
  type String        // "fault" | "region" | "liquefaction_zone"
  geometry Unsupported("geometry")?
  riskLevel String   // "low" | "medium" | "high" | "critical"
  metadata Json?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([type])
  @@index([riskLevel])
}

model RealTimeAlert {
  id String @id @default(cuid())
  eventId String?
  alertType String   // "new_event" | "magnitude_threshold" | "depth_alert"
  severity String    // "low" | "medium" | "high" | "critical"
  message String
  resolved Boolean @default(false)
  
  createdAt DateTime @default(now())
  resolvedAt DateTime?
  
  @@index([resolved])
  @@index([createdAt])
}

model DataSource {
  id String @id @default(cuid())
  name String        // "USGS" | "EMSC"
  apiUrl String
  lastSyncAt DateTime?
  syncFrequencyMinutes Int @default(5)
  enabled Boolean @default(true)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**After Step 2.3**:
```bash
# Generate migrations
npm run db:generate

# Apply migrations
npm run db:migrate

# Verify schema
npx prisma db push
```

#### Step 2.4 - External API Integration Layer
**File**: `lib/seismic-service.ts` (NEW)

```typescript
import axios from 'axios';
import { db } from './db';
import { SeismicEvent } from '@prisma/client';

// ============================================
// USGS Integration
// ============================================
export class USGSClient {
  private baseUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary';
  
  async getRecentEarthquakes(options: {
    days?: number;
    minMagnitude?: number;
    maxMagnitude?: number;
  } = {}) {
    const { days = 7, minMagnitude = 3.0, maxMagnitude = 10 } = options;
    
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - days * 24 * 60 * 60 * 1000);
    
    const url = `${this.baseUrl}/all_week.geojson`;
    
    try {
      const response = await axios.get(url);
      const features = response.data.features || [];
      
      return features
        .filter((f: any) => {
          const mag = f.properties?.mag || 0;
          return mag >= minMagnitude && mag <= maxMagnitude;
        })
        .map((f: any) => ({
          usgsId: f.id,
          magnitude: f.properties.mag,
          depth: f.geometry.coordinates[2],
          latitude: f.geometry.coordinates[1],
          longitude: f.geometry.coordinates[0],
          timestamp: new Date(f.properties.time),
          source: 'USGS' as const,
          confidence: 0.95,
        }));
    } catch (error) {
      console.error('USGS fetch failed:', error);
      return [];
    }
  }
}

// ============================================
// EMSC Integration
// ============================================
export class EMSCClient {
  private baseUrl = 'https://www.seismicportal.eu/fdsnws/event/1/query';
  
  async getRecentEvents(options: {
    hours?: number;
    minMagnitude?: number;
  } = {}) {
    const { hours = 24, minMagnitude = 3.0 } = options;
    
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          format: 'geojson',
          limit: 500,
          minmagnitude: minMagnitude,
          orderby: 'time-asc',
        },
      });
      
      return response.data.features.map((f: any) => ({
        emscId: f.id,
        magnitude: f.properties.magnitude,
        depth: f.properties.depth,
        latitude: f.geometry.coordinates[1],
        longitude: f.geometry.coordinates[0],
        timestamp: new Date(f.properties.origin_time),
        source: 'EMSC' as const,
        confidence: 0.90,
      }));
    } catch (error) {
      console.error('EMSC fetch failed:', error);
      return [];
    }
  }
}

// ============================================
// Data Processor & Deduplication
// ============================================
export class SeismicDataProcessor {
  async processAndStore(events: any[]) {
    for (const event of events) {
      // Check if already exists
      const exists = await db.seismicEvent.findFirst({
        where: {
          OR: [
            { usgsId: event.usgsId },
            { emscId: event.emscId },
          ],
        },
      });
      
      if (!exists) {
        // Create new event
        await db.seismicEvent.create({
          data: {
            usgsId: event.usgsId,
            emscId: event.emscId,
            magnitude: event.magnitude,
            depth: event.depth,
            latitude: event.latitude,
            longitude: event.longitude,
            timestamp: event.timestamp,
            source: event.source,
            confidence: event.confidence,
          },
        });
      }
    }
  }
}
```

#### Step 2.5 - API Routes Nouvelles (Seismic)
**Files**: Create in `app/api/seismic/` and `app/api/external/`

**File**: `app/api/seismic/events/route.ts` (NEW)
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import redis from '@/lib/redis';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const days = parseInt(searchParams.get('days') || '7');
  const minMag = parseFloat(searchParams.get('minMag') || '3.0');
  const limit = parseInt(searchParams.get('limit') || '100');
  
  // Try cache first
  const cacheKey = `seismic:events:${days}:${minMag}:${limit}`;
  const cached = await redis.getCache(cacheKey);
  
  if (cached) {
    return NextResponse.json(cached);
  }
  
  // Fetch from DB
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const events = await db.seismicEvent.findMany({
    where: {
      timestamp: { gte: startDate },
      magnitude: { gte: minMag },
    },
    take: limit,
    orderBy: { timestamp: 'desc' },
  });
  
  // Cache for 30 seconds (real-time)
  await redis.setCache(cacheKey, events, 30);
  
  return NextResponse.json(events);
}
```

**File**: `app/api/external/usgs-sync/route.ts` (NEW)
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { USGSClient, SeismicDataProcessor } from '@/lib/seismic-service';

export async function POST(request: NextRequest) {
  try {
    const usgs = new USGSClient();
    const events = await usgs.getRecentEarthquakes({
      days: 7,
      minMagnitude: 3.0,
    });
    
    const processor = new SeismicDataProcessor();
    await processor.processAndStore(events);
    
    return NextResponse.json({
      success: true,
      eventsProcessed: events.length,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('USGS sync failed:', error);
    return NextResponse.json(
      { error: 'Sync failed' },
      { status: 500 }
    );
  }
}
```

#### Step 2.6 - Background Sync Service
**File**: `lib/seismic-sync-service.ts` (NEW)

```typescript
import { USGSClient, EMSCClient, SeismicDataProcessor } from './seismic-service';
import { db } from './db';

export class SeismicSyncService {
  private syncInterval: NodeJS.Timeout | null = null;
  
  start() {
    // Sync every 5 minutes
    this.syncInterval = setInterval(() => this.sync(), 5 * 60 * 1000);
    
    // Run immediately on startup
    this.sync();
  }
  
  stop() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
  }
  
  private async sync() {
    console.log('[Seismic Sync] Starting background sync...');
    
    try {
      // Fetch from both sources
      const usgs = new USGSClient();
      const emsc = new EMSCClient();
      
      const [usgsEvents, emscEvents] = await Promise.all([
        usgs.getRecentEarthquakes({ days: 7 }),
        emsc.getRecentEvents({ hours: 24 }),
      ]);
      
      // Process and store
      const processor = new SeismicDataProcessor();
      await processor.processAndStore([...usgsEvents, ...emscEvents]);
      
      // Update lastSync
      await db.dataSource.update({
        where: { name: 'USGS' },
        data: { lastSyncAt: new Date() },
      });
      
      console.log('[Seismic Sync] ✓ Sync complete');
    } catch (error) {
      console.error('[Seismic Sync] ✗ Sync failed:', error);
    }
  }
}

// Start sync in next.js startup
if (process.env.NODE_ENV === 'production') {
  const syncService = new SeismicSyncService();
  syncService.start();
}
```

**Validation Step 2**:
```bash
# 1. Build should pass
npm run build

# 2. Test new endpoints
curl http://localhost:3000/api/seismic/events

# 3. Check database
npm run db:migrate

# 4. Commit
git add .
git commit -m "Phase B: Backend real-time integration (USGS/EMSC + PostGIS)"
```

---

### PHASE 3: FRONTEND - MAPBOX INTÉGRATION (5-6h) - SÉQUENCE C

**Objectif**: UI moderne Mapbox avec couches géo

#### Step 3.1 - Remplacer Leaflet par Mapbox
**File**: `components/carte-sismique-v2/map-canvas.tsx` (NEW)

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set Mapbox token (get from https://studio.mapbox.com/)
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface MapCanvasProps {
  events: SeismicEvent[];
  onSelectEvent: (event: SeismicEvent) => void;
  filters: MapFilters;
}

export default function MapCanvas({ events, onSelectEvent, filters }: MapCanvasProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [style, setStyle] = useState<'satellite' | 'dark'>('dark');
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style === 'satellite'
        ? 'mapbox://styles/mapbox/satellite-v9'
        : 'mapbox://styles/mapbox/dark-v11',
      center: [-72.335, 18.539],
      zoom: 8,
    });
    
    // Add earthquake layer when map loads
    map.current.on('load', () => {
      addEarthquakeLayer();
      addFaultLines();
      addLiquefactionZones();
    });
    
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);
  
  const addEarthquakeLayer = () => {
    if (!map.current) return;
    
    // Add data source
    map.current.addSource('earthquakes', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: events.map(e => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [e.lng, e.lat],
          },
          properties: {
            magnitude: e.magnitude,
            depth: e.depth,
            risk: e.risk,
            id: e.id,
          },
        })),
      },
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });
    
    // Add cluster layer
    map.current.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'earthquakes',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': '#00f2ff',
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40,
        ],
      },
    });
    
    // Add cluster count layer
    map.current.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'earthquakes',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium'],
        'text-size': 12,
      },
      paint: {
        'text-color': '#fff',
      },
    });
    
    // Add individual earthquake layer
    map.current.addLayer({
      id: 'earthquake-points',
      type: 'circle',
      source: 'earthquakes',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['get', 'magnitude'],
          4,
          4,
          8,
          20,
        ],
        'circle-color': [
          'match',
          ['get', 'risk'],
          'critical',
          '#ff3333',
          'high',
          '#ff6b6b',
          'medium',
          '#ffb700',
          '#00f2ff',
        ],
        'circle-opacity': 0.8,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff',
      },
    });
    
    // Add hover effect
    map.current.on('mousemove', 'earthquake-points', () => {
      if (map.current) map.current.getCanvas().style.cursor = 'pointer';
    });
    
    map.current.on('mouseleave', 'earthquake-points', () => {
      if (map.current) map.current.getCanvas().style.cursor = '';
    });
    
    // Add click handler
    map.current.on('click', 'earthquake-points', (e) => {
      const data = e.features?.[0]?.properties;
      if (data) {
        onSelectEvent(events.find(ev => ev.id === parseInt(data.id)) as SeismicEvent);
      }
    });
  };
  
  const addFaultLines = () => {
    if (!map.current) return;
    
    // Add fault lines source and layer
    map.current.addSource('faults', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [-74.5, 19.95],
                [-71.5, 19.45],
              ],
            },
            properties: { name: 'Faille Septentrionale' },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [-74.8, 17.95],
                [-71.8, 18.7],
              ],
            },
            properties: { name: 'Faille Enriquillo' },
          },
        ],
      },
    });
    
    map.current.addLayer({
      id: 'fault-lines',
      type: 'line',
      source: 'faults',
      paint: {
        'line-color': '#ff3333',
        'line-width': 2,
        'line-dasharray': [4, 2],
      },
    });
  };
  
  const addLiquefactionZones = () => {
    if (!map.current) return;
    
    // Add liquefaction zones as circles
    map.current.addSource('liquefaction', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-72.335, 18.5392],
            },
            properties: { name: 'Port-au-Prince', risk: 'TRÈS ÉLEVÉ' },
          },
          // ... add more zones
        ],
      },
    });
    
    map.current.addLayer({
      id: 'liquefaction-zones',
      type: 'circle',
      source: 'liquefaction',
      paint: {
        'circle-radius': 30,
        'circle-color': '#ff6b6b',
        'circle-opacity': 0.2,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ff3333',
      },
    });
  };
  
  return (
    <div ref={mapContainer} className="w-full h-full" />
  );
}
```

#### Step 3.2 - Créer Panneaux Latéraux
**Files**: 
- `components/carte-sismique-v2/filter-panel.tsx`
- `components/carte-sismique-v2/legend-panel.tsx`
- `components/carte-sismique-v2/event-card.tsx`

**Filter Panel** structure:
```typescript
// Filters for:
// - Magnitude range slider
// - Depth range slider
// - Date range picker
// - Risk level checkboxes
// - Source (USGS/EMSC) toggle
// - Custom bbox filter
```

**Legend Panel** structure:
```typescript
// Display:
// - Risk level colors
// - Magnitude sizes
// - Data sources
// - Last update time
// - Toggle each layer
```

**Event Card** structure:
```typescript
// Show:
// - Epicenter location
// - Magnitude
// - Depth
// - Risk level
// - Timestamp
// - Distance to nearest city
// - Affected buildings estimate
```

#### Step 3.3 - Layout Principal
**File**: `components/carte-sismique-v2/map-container.tsx` (NEW)

```typescript
'use client';

import { useState, useEffect } from 'react';
import MapCanvas from './map-canvas';
import FilterPanel from './filter-panel';
import LegendPanel from './legend-panel';
import EventCard from './event-card';
import StatisticsPanel from './statistics-panel';

export default function MapContainer() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filters, setFilters] = useState({...});
  const [stats, setStats] = useState({...});
  
  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/seismic/events?days=7&minMag=3.0');
      const data = await response.json();
      setEvents(data);
    };
    
    fetchEvents();
    const interval = setInterval(fetchEvents, 30000); // Update every 30s
    
    return () => clearInterval(interval);
  }, []);
  
  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch('/api/seismic/stats');
      const data = await response.json();
      setStats(data);
    };
    
    fetchStats();
  }, [events]);
  
  return (
    <div className="flex h-screen">
      {/* Main map */}
      <div className="flex-1">
        <MapCanvas events={events} onSelectEvent={setSelectedEvent} filters={filters} />
      </div>
      
      {/* Right sidebar */}
      <div className="w-96 bg-black/80 border-l border-cyan-500/30 flex flex-col">
        {/* Legend */}
        <LegendPanel />
        
        {/* Filters */}
        <FilterPanel onFilterChange={setFilters} />
        
        {/* Statistics */}
        <StatisticsPanel stats={stats} />
        
        {/* Selected event detail */}
        {selectedEvent && <EventCard event={selectedEvent} />}
      </div>
    </div>
  );
}
```

#### Step 3.4 - Styling & Esthétique
**File**: `components/carte-sismique-v2/map-styles.css` (NEW)

```css
/* Professional seismic map styling */

.mapboxgl-container {
  @apply border border-cyan-500/30;
}

.mapboxgl-popup {
  @apply bg-black/90 border border-cyan-500 rounded;
}

.mapboxgl-popup-content {
  @apply text-cyan-300 font-mono text-sm;
}

/* Cluster styling */
.cluster {
  @apply bg-gradient-to-br from-cyan-500 to-blue-600;
  @apply text-white font-bold text-center;
  @apply rounded-full border-2 border-white;
}

/* Legend items */
.legend-item {
  @apply flex items-center gap-2 py-2 px-3;
  @apply hover:bg-white/5 transition-colors;
}

.legend-color-box {
  @apply w-6 h-6 rounded border border-white/30;
}

/* Filter controls */
.filter-control {
  @apply bg-black/60 border border-cyan-500/30 rounded;
  @apply p-3 mb-3 hover:bg-black/80 transition;
}

.filter-label {
  @apply text-cyan-300 font-mono text-xs uppercase tracking-wide;
}
```

**Validation Step 3**:
```bash
# 1. Add Mapbox token
echo "NEXT_PUBLIC_MAPBOX_TOKEN=your_token" >> .env.local

# 2. Build test
npm run build

# 3. Start dev server
npm run dev

# 4. Test map at http://localhost:3000/modules/carte

# 5. Verify interactions
# - Zoom in/out
# - Click on earthquake
# - Filter by magnitude
# - Toggle layers
```

---

### PHASE 4: OPTIMISATIONS & PERFS (3-4h) - SÉQUENCE D

#### Step 4.1 - Clustering Avancé
```typescript
// Implement clustering in Mapbox
// - Auto cluster at zoom levels
// - Show cluster size
// - Animation on zoom
```

#### Step 4.2 - Caching Redis Avancé
```typescript
// Multi-tier cache:
// - Real-time: 30s
// - Trending: 5min
// - Historical: 1hour
```

#### Step 4.3 - Performance Metrics
```bash
# Add monitoring
npm install sentry
npm install posthog  # Analytics
```

---

### PHASE 5: TESTING & DOCS (3h) - SÉQUENCE F

#### Step 5.1 - Jest Setup
```bash
npm install -D jest @testing-library/react ts-jest

# Create jest.config.ts
# Create first 20 tests
```

#### Step 5.2 - Documentation
```bash
# Generate API docs
# Create Storybook components
```

---

## 📊 SUCCESS CRITERIA (EACH PHASE)

### Phase 1 ✅
- [ ] ESLint 0 errors
- [ ] TypeScript 0 errors
- [ ] All imports clean
- [ ] Code organized

### Phase 2 ✅
- [ ] USGS API working
- [ ] EMSC API working
- [ ] DB PostGIS ready
- [ ] Real-time events flowing

### Phase 3 ✅
- [ ] Mapbox rendering
- [ ] Filters working
- [ ] Layers displaying
- [ ] Responsive design

### Phase 4 ✅
- [ ] 1000+ points at 60fps
- [ ] <200ms API response
- [ ] Caching effective
- [ ] No memory leaks

### Phase 5 ✅
- [ ] 20+ tests passing
- [ ] API docs complete
- [ ] Code coverage 20%+
- [ ] Deployment ready

---

## 🎯 COMMANDES RAPIDES

```bash
# Development
npm run dev                  # Start dev server
npm run build              # Build production
npm run lint               # Lint code

# Database
npm run db:migrate         # Apply migrations
npm run db:seed            # Seed data
npm run db:reset           # Full reset

# Syncing
curl -X POST http://localhost:3000/api/external/usgs-sync
curl -X POST http://localhost:3000/api/external/emsc-sync

# Testing
npm run test               # Run tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

---

## 📋 FOLLOW-UP CHECKLIST

After implementation:

- [ ] All Phase tests passing
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Performance under 200ms
- [ ] Map renders 1000+ points smoothly
- [ ] Real-time updates working
- [ ] Mobile responsive
- [ ] Dark/light modes working
- [ ] All filters functional
- [ ] Alerts triggering
- [ ] Documentation complete
- [ ] Ready for phase 5: Full Testing

---

**Engineering Prompt Version**: 1.0  
**Status**: READY FOR EXECUTION  
**Estimated Total Time**: 20-25 hours  
**Best Run By**: Team of 2-3 developers  
**Last Updated**: May 22, 2026
