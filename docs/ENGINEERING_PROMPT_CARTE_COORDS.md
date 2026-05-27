# Prompt ingénierie — Carte sismique : erreurs MapLibre, coordonnées, esthétique

## Objectif
Carte SisAyiti sans erreur console, points positionnés selon catalogues USGS/EMSC, historique majeur visible, interactions précises, rendu visuel soigné.

## 1. Erreurs MapLibre (bloquantes)
- **circle-radius** : `zoom` uniquement en `interpolate`/`step` de premier niveau — pas dans `*`.
- **text-field** : pas de division instable ; `case` + `coalesce` ; pas de libellé sur clusters (`point_count`).
- **Polices** : `Open Sans Bold` via `glyphs` du style (openmaptiles).

## 2. Précision géographique
- Source primaire : **USGS FDSN** `format=geojson` + bbox Hispaniola (17–21°N, 75–68°W).
- GeoJSON : `coordinates = [longitude, latitude, depth_km]`.
- `normalizeLonLat()` : correction inversion lat/lon zone Caraïbes.
- Déduplication : **priorité USGS** sur EMSC.
- Historique (période ≥ 30 j) : 2010 Léogâne (18.457, -72.533), 1842 Cap-Haïtien, 1751 PAP — coordonnées USGS/EERI.

## 3. Esthétique points
- Couleur = profondeur ; halo + pulse ; or pour événements historiques.
- Contour cyan sélection / blanc survol.
- Rayons magnitude × zoom (interpolate imbriqué valide).

## 4. Interactions
- Popup : M, profondeur, région, coords, distance PAP, source.
- Clic : panneau `EventCard` + flyTo.

## Références
- https://earthquake.usgs.gov/fdsnws/event/1/
- https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
- USGS/EERI 2010 Haiti : 18.457°N, 72.533°W, Mw 7.0

## Critères d’acceptation
- [ ] Aucune erreur `circle-radius` / `numberToString` en console
- [ ] Points visibles (filtre profondeur négative EMSC corrigé)
- [ ] Événement 2010 visible en période 30 jours
- [ ] Clic affiche fiche précise
