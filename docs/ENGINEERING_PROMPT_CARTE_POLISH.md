# Prompt ingénierie — Finition carte sismique SisAyiti

## Objectif produit
Transformer la carte « Après » en expérience scientifique complète : points lisibles et animés, interactions riches, couches esthétiques, précision géographique Haïti, UI glassmorphism cohérente.

## Prompt structuré (exécuté)

### 1. Points sismiques — visibilité & animation
- Rayon **magnitude × zoom** (interpolations MapLibre).
- **Couleur = profondeur** (0–30, 30–70, 70–150, >150 km).
- Halo (glow) pour M ≥ 4.5 ; **pulse RAF** pour M ≥ 5.
- `feature-state` `hover` / `selected` (contour cyan / blanc).
- Labels `M{x}` pour M ≥ 3.5 à partir du zoom 6.5.

### 2. Position & précision géographique
- `maxBounds` Haïti (`HAITI_MAX_BOUNDS`).
- Coordonnées **DD** et **DMS** dans popup et panneau.
- Distance Haversine vers **Port-au-Prince**.
- Badge zone Haïti / périphérie.

### 3. Interactions
- **Survol** : popup glassmorphism (profondeur, coords, distance PAP, source, date).
- **Clic** : sélection + `flyTo` zoom ≥ 9.5 + panneau `EventCard` enrichi.
- **Cluster** : expansion zoom automatique.

### 4. Couches & esthétique options
- Panneau couches : icônes, descriptions, toggles iOS-style.
- Failles (glow), liquéfaction (labels), zones risque (contour).
- Heatmap magnitude optionnelle.

### 5. Fichiers touchés
| Fichier | Rôle |
|---------|------|
| `lib/seismic-geo.ts` | Bounds, coords, distance, couleurs profondeur |
| `lib/seismic-map-style.ts` | Expressions paint/layout typées |
| `lib/setup-map-layers.ts` | Couches, pulse, hover, sélection |
| `lib/map-popup-html.ts` | HTML popup enrichi |
| `map-canvas.tsx` | Bounds, pulse lifecycle, highlight |
| `event-card.tsx` | Fiche détaillée événement |
| `layer-toggle.tsx` | UI couches |
| `app/globals.css` | Styles `.seismic-popup` |

## Critères d’acceptation
- [x] Build `npm run build` OK
- [ ] Test manuel module Carte : hover, clic, toggles couches, bascule satellite/sombre
- [ ] Points M≥5 pulsent ; sélection visible sur carte

## Pistes phase suivante
- Filtres panneau (esthétique alignée `layer-toggle`)
- Géocodage inverse région USGS
- Animation entrée nouveaux événements temps réel
- Légende dynamique selon zoom actif
