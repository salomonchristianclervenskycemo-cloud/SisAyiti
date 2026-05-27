# Prompt d'ingénierie — Carte sismique « Après » (SisAyiti)

**Date** : 24 mai 2026  
**Référence visuelle** : maquette « Avant / Après » (glassmorphism, satellite, légende scientifique, barre supérieure/inférieure)  
**Stack actuelle** : Next.js 16, React 19, MapLibre GL JS, Zustand, Prisma 7, API USGS/EMSC  
**Objectif** : Atteindre le rendu « Après » de la maquette, corriger les défauts bloquants, livrer une carte rapide, lisible et scientifiquement crédible.

---

## 1. Constat (état actuel)

### Ce qui existe déjà
- Module `components/carte-sismique-v2/` (MapCanvas, MapContainer, filtres, légende, stats, sidebar événement).
- MapLibre GL JS (sans token Mapbox) + fond Carto dark / Esri satellite.
- Sources GeoJSON statiques (failles, liquéfaction, zones de risque) via `/api/seismic/layers`.
- Événements via `/api/seismic/events` (DB → fallback USGS/EMSC).
- Store Zustand (`lib/seismic-store.ts`), types (`lib/seismic-types.ts`), hooks fetch/SSE.

### Défauts connus qui empêchent le bon fonctionnement
| # | Symptôme | Cause probable |
|---|----------|----------------|
| D1 | Carte vide ou lente au chargement | PostgreSQL/Redis non démarrés ; timeouts ; overlay loading plein écran |
| D2 | Couches disparaissent au changement Sombre/Satellite | `map.setStyle()` supprime sources/layers — pas de réinjection dans `style.load` |
| D3 | Données incohérentes ou 0 événement | EMSC/USGS partiellement en erreur ; pas de message utilisateur clair |
| D4 | Erreurs console MapLibre (résolues partiellement) | glyphs, couleurs hex 8 chars — à ne pas réintroduire |
| D5 | UX « prototype » vs maquette | Sidebar 288px fixe à gauche qui réduit la carte ; pas de barre haute/basse flottante |
| D6 | Visualisation non scientifique | Couleur = risque uniquement ; maquette exige **taille = magnitude**, **couleur = profondeur** |
| D7 | Pas de libellés sur la carte | Absence de couche `symbol` avec `M {magnitude}` sur les séismes significatifs |
| D8 | Pas d’échelle ni coordonnées | Manque `ScaleControl` + affichage lat/lng curseur |
| D9 | Légende incomplète | Pas de section **Profondeur** (0–30, 30–70, 70–150, 150+ km) |
| D10 | Filtres peu visibles | Pas de barre basse type « Aujourd’hui / Toutes magnitudes / Real-time » |

### Écart visuel « Avant » → « Après » (cible)

| Zone | Avant (actuel) | Après (cible maquette) |
|------|----------------|-------------------------|
| Fond | Noir plat ou tiles basiques | **Imagerie satellite haute résolution** (Esri), relief lisible |
| Points sismiques | Gros cercles rouge/orange uniformes | Points **proportionnels à M**, **couleur par profondeur**, halo/pulse discret |
| Libellés | Aucun | `M 6.2` etc. sur événements M ≥ seuil (ex. 4.5) |
| Failles | Traits rouges simples | **Septentrionale** (orange pointillé) + **Enriquillo-PG** (rouge plein), épaisseur visible |
| Layout | Panneau latéral large avec tout dedans | **Carte plein écran** + overlays glassmorphism |
| Barre haute | Titre dans sidebar | Titre centré/haut, badge **ACTIF** vert, horodatage + « Last updated » |
| Barre basse | Absente | Sélecteurs **période**, **magnitude**, toggle **Real-time** |
| Légende | Risque seulement, coin sidebar | Coin **bas-gauche carte** : Magnitude + Profondeur + Failles |
| Outils carte | Navigation MapLibre seule | Barre d’icônes verticale fine (zoom, localisation, couches, filtres) |
| Précision | Approximative | Coordonnées, profondeur, source, fuseau affichés sur sélection |

---

## 2. Principes directeurs (à respecter dans toute implémentation)

1. **Carte d’abord** : la carte occupe 100 % de la zone module ; les UI sont des overlays `pointer-events-auto`, pas une colonne fixe de 272px.
2. **Encodage visuel scientifique** :
   - `circle-radius` ← magnitude (interpolation linéaire bornée).
   - `circle-color` ← profondeur (échelle 4 classes, voir §4.2).
   - Optionnel : contour blanc semi-transparent en `rgba()`, jamais hex 8 caractères.
3. **Robustesse MapLibre** :
   - Toute logique d’ajout de sources/layers dans une fonction `setupMapLayers(map)` appelée sur `load` **et** sur `style.load` après `setStyle`.
   - Styles JSON avec `glyphs` obligatoire si couche `symbol` / `text-field`.
4. **Données résilientes** : l’UI ne doit jamais casser si DB/Redis down ; afficher bandeau « mode hors-ligne / données USGS » + compteur.
5. **Performance** : max ~500–1000 points visibles ; clustering activé au zoom < 10 ; heatmap optionnelle ; pas de re-fetch global à chaque pan.
6. **Cohérence SisAyiti** : dark mode, cyan accent, glassmorphism `bg-black/50 backdrop-blur-xl border border-white/10`, typo existante (Inter).

---

## 3. Architecture cible (composants)

```
components/carte-sismique-v2/
├── map-container.tsx          # Orchestration layout « Après »
├── map-canvas.tsx             # MapLibre : layers, style, interactions
├── map-top-bar.tsx            # NOUVEAU — titre, ACTIF, date/heure
├── map-bottom-bar.tsx         # NOUVEAU — période, magnitude, real-time
├── map-toolbar.tsx            # NOUVEAU — icônes verticales (zoom, fit Haiti, layers, search)
├── map-legend-overlay.tsx     # NOUVEAU — légende flottante bas-gauche (M + profondeur + failles)
├── map-coordinates.tsx        # NOUVEAU — lat/lng + échelle (ou controls MapLibre)
├── filter-panel.tsx           # Refactor — drawer/modal depuis toolbar, pas sidebar permanente
├── layer-toggle.tsx           # Refactor — intégré toolbar ou popover
├── event-card.tsx             # Garder — panneau détail événement (droite, glass)
├── sidebar-panel.tsx          # Refactor — uniquement détail événement, pas filtres
└── statistics-panel.tsx       # Optionnel — repliable ou intégré top-bar
```

**Lib partagée**
```
lib/
├── seismic-map-style.ts       # NOUVEAU — palettes magnitude/depth, expressions MapLibre
├── seismic-layers-data.ts     # Enrichir failles (styles distincts par id)
└── seismic-types.ts           # Ajouter depthClass, label visibility si besoin
```

---

## 4. Spécifications techniques détaillées

### 4.1 Layout « Après » (CSS / structure)

```
┌─────────────────────────────────────────────────────────────┐
│  [MapTopBar]  Carte Sismique d'Haïti  ● ACTIF  23 Mai …   │
├─────────────────────────────────────────────────────────────┤
│[T]│                                                         │
│ o │              MAPLIBRE CANVAS (100%)                     │
│ o │   [MapLegendOverlay bottom-left]                        │
│ o │                                    [EventCard right]    │
│[T]│                                                         │
├─────────────────────────────────────────────────────────────┤
│  [MapBottomBar]  Période ▾  Magnitude ▾  ◉ Real-time        │
│                                    [coords] [scale 50 km]   │
└─────────────────────────────────────────────────────────────┘
T = MapToolbar (48px, icônes seulement)
```

- Supprimer `ml-72` sur la zone carte dans `map-container.tsx`.
- `MapToolbar` : `position:absolute; left:12px; top:50%; transform:translateY(-50%); z-index:1000`.

### 4.2 Couleurs profondeur (couche earthquakes)

| Classe | Profondeur (km) | Couleur |
|--------|-----------------|--------|
| shallow | 0 – 30 | `#ff4444` |
| intermediate | 30 – 70 | `#ffaa00` |
| deep | 70 – 150 | `#44aaff` |
| very-deep | > 150 | `#8844ff` |

Expression MapLibre (exemple) :
```js
'circle-color': [
  'step', ['get', 'depth'],
  '#ff4444', 30,
  '#ffaa00', 70,
  '#44aaff', 150,
  '#8844ff'
]
```

### 4.3 Rayon magnitude
```js
'circle-radius': [
  'interpolate', ['linear'], ['get', 'magnitude'],
  2, 4,
  4, 8,
  6, 14,
  8, 22
]
```

### 4.4 Libellés magnitude (couche symbol)
- Source : même `earthquakes`, filtre : `['>=', ['get', 'magnitude'], 4.5]` et pas cluster.
- `text-field`: ['concat', 'M ', ['to-string', ['round', ['get', 'magnitude']]]]
- `text-size`: 11, `text-offset`: [0, -1.2], `text-color`: #ffffff
- Nécessite `glyphs` dans le style (déjà sur CARTO_DARK_STYLE / SATELLITE_STYLE).

### 4.5 Failles
- Deux layers `line` ou un layer avec `line-color` match sur `id` / `name` :
  - `septentrionale` → `#ff9500`, `line-dasharray`: [4, 2], width 2.5
  - `enriquillo` → `#ff3333`, width 3

### 4.6 Contrôles MapLibre
- `NavigationControl` → dans toolbar custom ou bottom-right discret.
- `ScaleControl` → `maxWidth: 100, unit: 'metric'` bas-droite.
- `GeolocateControl` optionnel (secondaire).

### 4.7 Changement de style (fix D2)
```ts
function initMap() {
  map.on('load', () => setupMapLayers(map))
  map.on('style.load', () => setupMapLayers(map)) // réappliquer après setStyle
}
```
`setupMapLayers` : idempotent (vérifier `getSource` avant `addSource`).

### 4.8 Barre basse — filtres
- **Période** : presets `24h | 7j | 30j | Personnalisé` → met à jour `MapFilters.dateRange` + refetch.
- **Magnitude** : `Toutes | M≥3 | M≥4 | M≥5` → met à jour `filters.magnitude.min`.
- **Real-time** : toggle SSE (`useRealTimeUpdates`) + indicateur dans top-bar.

### 4.9 API / données (stabilité)
- `/api/seismic/events` : conserver fallback USGS si DB timeout ; toujours JSON.
- `/api/seismic/layers` : statique, cache HTTP 24h (déjà fait).
- Afficher `source: 'live' | 'database'` dans l’UI (petit texte sous compteur).
- Ne pas bloquer la carte si `isLoading` — spinner discret en top-bar seulement.

---

## 5. Prompt d’exécution (à suivre par l’agent développeur)

> **Rôle** : Tu es un ingénieur front-end senior spécialisé MapLibre GL JS et React/Next.js. Tu travailles sur SisAyiti (`sisyiti-app`). Ta mission est d’implémenter la refonte UI/UX de la carte sismique pour correspondre à la maquette « Après » fournie par le product owner, tout en corrigeant les bugs de fonctionnement listés en section 1.

### Phase 0 — Prérequis (30 min)
- [ ] Lancer `npm run dev`, ouvrir le module Carte, noter toutes les erreurs console.
- [ ] Vérifier `GET /api/seismic/layers` → 200 JSON.
- [ ] Vérifier `GET /api/seismic/events?days=7&minMagnitude=2.5` → 200 JSON avec `events[]`.
- [ ] Confirmer que MapLibre charge sans token (pas d’import `mapbox-gl`).

### Phase 1 — Stabilité carte (bloquant)
- [ ] Extraire `setupMapLayers(map)` dans `map-canvas.tsx` (sources earthquakes, faults, liquefaction, risk, toutes layers).
- [ ] Brancher `map.on('style.load', () => setupMapLayers(map))`.
- [ ] Après `setStyle`, réattacher les event handlers click/hover.
- [ ] Tester 5 bascules Sombre ↔ Satellite : couches et points doivent rester visibles.
- [ ] Remplacer toute couleur `#RRGGBBAA` par `rgba(r,g,b,a)`.
- [ ] Vérifier `glyphs` présent dans `CARTO_DARK_STYLE` et `SATELLITE_STYLE`.

### Phase 2 — Visualisation scientifique (cœur métier)
- [ ] Créer `lib/seismic-map-style.ts` avec constantes depth/magnitude et helpers d’expressions.
- [ ] Modifier couche `earthquakes` : couleur = profondeur, rayon = magnitude (§4.2–4.3).
- [ ] Ajouter couche `earthquake-labels` (symbol) pour M≥4.5 (§4.4).
- [ ] Styliser failles distinctement (§4.5).
- [ ] Mettre à jour `map-legend-overlay` : sections Magnitude, Profondeur, Failles (aligné maquette).
- [ ] Retirer l’ancienne légende « risque seulement » ou la mapper en sous-texte si utile.

### Phase 3 — Layout « Après » (UI)
- [ ] Refactor `map-container.tsx` : carte plein écran, supprimer sidebar gauche 288px.
- [ ] Créer `map-top-bar.tsx` (titre, RealTimeBadge style ACTIF vert, horodatage last sync).
- [ ] Créer `map-bottom-bar.tsx` (sélecteurs période/magnitude, toggle real-time).
- [ ] Créer `map-toolbar.tsx` (icônes : zoom +/-, fit bounds Haiti, layers popover, ouvrir filtres).
- [ ] Créer `map-legend-overlay.tsx` positionné `absolute bottom-4 left-16` (à droite de la toolbar).
- [ ] Déplacer `SidebarPanel` / `EventCard` en overlay droit uniquement à la sélection.
- [ ] Ajouter `ScaleControl` + composant coords (mousemove sur carte).
- [ ] Loading : retirer overlay plein écran ; spinner inline dans top-bar.

### Phase 4 — Données & filtres
- [ ] Connecter bottom-bar aux filtres Zustand + `useSeismicEvents` params.
- [ ] Afficher bandeau si `events.length === 0` : « Aucun événement — vérifier connexion ou élargir filtres ».
- [ ] Afficher source données (`live` / `database`) discrètement.
- [ ] Valider EMSC `format=json` (déjà corrigé) — test fetch Haiti bbox.

### Phase 5 — Finition & performance
- [ ] Limiter labels aux zoom ≥ 8 pour perf.
- [ ] Clustering : garder au zoom < 10, désactiver labels sur clusters.
- [ ] Transition `flyTo` sur sélection (déjà partiel).
- [ ] Optionnel : animation pulse CSS sur points M≥6 (canvas overlay ou icon-size interpolate).
- [ ] `npm run build` sans erreur TypeScript.
- [ ] Test manuel : chargement < 3s perçu, pas d’erreur console, interaction fluide.

### Critères d’acceptation (Definition of Done)
1. Rendu visuellement aligné à la maquette « Après » (satellite par défaut ou un clic, overlays glass, légende bas-gauche, barres haut/bas).
2. **Taille = magnitude, couleur = profondeur** sur les points.
3. Libellés `M x.x` visibles sur séismes significatifs.
4. Failles Septentrionale / Enriquillo distinguées.
5. Bascule style sans perte de couches.
6. Aucune erreur MapLibre dans la console au chargement standard.
7. API events/layers répondent en JSON ; pas de `Unexpected token '<'`.
8. Carte utilisable sans PostgreSQL (mode live USGS).

### Hors scope (v2.1+)
- Export CSV/GeoJSON
- Recherche géographique Nominatim
- Notifications push navigateur
- Heatmap temps réel avancée
- PostGIS / tuiles vectorielles custom

### Fichiers principaux à modifier
- `components/carte-sismique-v2/map-canvas.tsx`
- `components/carte-sismique-v2/map-container.tsx`
- `components/carte-sismique-v2/legend-panel.tsx` → ou remplacer par `map-legend-overlay.tsx`
- `lib/seismic-layers-data.ts`
- `lib/seismic-map-style.ts` (nouveau)
- `hooks/use-seismic-events.ts` (paramètres période)
- `app/globals.css` (si animations pulse)

### Contraintes
- Ne pas réintroduire Leaflet ni Mapbox GL (token).
- Ne pas élargir le scope aux autres modules (Comprendre, Simulation, etc.).
- Commits atomiques par phase si l’utilisateur demande des commits.
- Minimiser les régressions : garder i18n FR/HT existant.

---

## 6. Ordre de priorité si le temps est limité

1. **P0** : Phase 1 (style.load + setupMapLayers) + Phase 2 (depth/magnitude viz)  
2. **P1** : Phase 3 (layout overlays)  
3. **P2** : Phase 4–5 (filtres barre basse, polish, perf)

---

## 7. Référence visuelle

Conserver l’image maquette « Après » comme source de vérité pour :
- Densité des panneaux (translucides, bords arrondis)
- Position légende (bas-gauche sur la carte)
- Badge vert « ACTIF »
- Fond satellite Haïti / Caraïbes
- Hiérarchie typographique (titre > sous-titre > légende 10–11px)

---

*Document prêt pour exécution par agent ou développeur. Commencer par Phase 0, puis enchaîner sans sauter Phase 1.*
