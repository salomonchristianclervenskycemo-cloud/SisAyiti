# Parcours démo jury — SisAyiti (~10 min)

## Avant la démo

```bash
cd sisyiti-app
npm install
cp .env.example .env.local   # optionnel si DB locale
docker compose up -d         # PostgreSQL + Redis (optionnel)
npm run db:push              # modèle signalements + scores
npm run dev:clean
```

Ouvrir **http://localhost:3000** — langue **HT (kreyòl)** recommandée pour le jury haïtien.

---

## 1. Accueil & crise (2 min)

1. Page d’accueil → cartes modules.
2. Si bannière **mode crise** visible : suivre **Comprendre → Prévention → Diagnostic** (parcours guidé).

## 2. Comprendre 2.0 (3 min)

1. Module **Comprendre** (`/comprendre`).
2. Ouvrir **3 sections** du parcours 15 min (barre de progression).
3. Montrer timeline + simulateur P/S (onde sismique).
4. Si **5/5 sections** : certificat imprimable.

## 3. Multirisques + signalements (2 min)

1. **Multirisques** (`/multirisques`) — cartes nationales + carte zones rurales (CARTO).
2. Onglet filtre **Signalements locaux**.
3. Soumettre un signalement test (type inondation) → liste + sync API `/api/community-reports`.

## 4. Diagnostic bâtiment (2 min)

1. **Diagnostic** (`/diagnostic`) — questionnaire 5 facteurs.
2. Résultat grade A–F + recommandations.
3. **Exporter le résumé** (impression / PDF navigateur).
4. Lien optionnel vers **Labo** (simulation pré-remplie).

## 5. Ville + Carte (1 min)

1. **Ville** — campagne Haïti, budget HTG, **classement** en tête de module.
2. **Carte** (`/carte`) — séismes récents, couches, empty state si pas de données.

---

## Points à souligner au jury

| Thème | Preuve dans l’app |
|--------|-------------------|
| Inclusion linguistique | FR / HT / EN / ES |
| Contexte Haïti | Campagne ville, zones rurales, USGS |
| Offline / 3G | Pack éducatif, signalements en attente |
| Science + pédagogie | Labo, Comprendre, diagnostic structuré |
| Données communautaires | API signalements + carte |

## En cas de problème

- Port 3000 occupé → `npm run dev:clean`
- Carte vide → bouton **Réessayer** ou sync admin
- DB absente → signalements stockés dans `data/community-reports.json`
