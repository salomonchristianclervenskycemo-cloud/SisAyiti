# Déploiement SisAyiti (web)

Guide pour mettre en ligne le site **sans** migration React Native.

---

## Prérequis

- Compte [GitHub](https://github.com) (repo du projet)
- Compte [Vercel](https://vercel.com) (hébergement Next.js)
- Base PostgreSQL ([Neon](https://neon.tech), [Supabase](https://supabase.com) ou [Railway](https://railway.app))
- (Recommandé) Redis ([Upstash](https://upstash.com) — plan gratuit)

---

## 1. Préparer la base de données

### Neon (exemple)

1. Créer un projet → copier la **connection string** PostgreSQL.
2. Format : `postgresql://user:pass@host/db?sslmode=require`

### Initialiser le schéma (une fois)

Depuis votre machine, avec la `DATABASE_URL` de production :

```bash
cd sisyiti-app
npm install
npx prisma generate
npx prisma db push
npm run db:seed
```

> Il n’y a pas encore de dossier `prisma/migrations/` : `db push` suffit pour le premier déploiement.

---

## 2. Variables d’environnement

Copier `.env.example` → `.env.local` en local. Sur **Vercel → Project → Settings → Environment Variables** :

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `DATABASE_URL` | Oui | URL PostgreSQL (SSL en prod) |
| `NEXTAUTH_SECRET` | Oui | Chaîne aléatoire longue (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Oui | URL publique exacte, ex. `https://sisayiti.vercel.app` |
| `ADMIN_SYNC_SECRET` | Oui (prod) | Secret pour sync manuelle (curl / admin) |
| `CRON_SECRET` | Oui (prod) | Même valeur que `ADMIN_SYNC_SECRET` si vous utilisez le cron Vercel |
| `REDIS_URL` | Non | Cache leaderboard/stats — l’app fonctionne sans |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Non | Fond carte Mapbox ; Carto utilisé en fallback |

Générer les secrets :

```bash
openssl rand -base64 32
```

---

## 3. Déployer sur Vercel

1. Importer le repo GitHub dans Vercel.
2. **Root Directory** : `sisyiti-app` (si le repo contient le dossier parent).
3. Framework : **Next.js** (détecté automatiquement).
4. Build : défini dans `vercel.json` → `prisma generate && next build`.
5. Ajouter toutes les variables d’environnement (Production + Preview).
6. **Deploy**.

Le fichier `vercel.json` configure aussi un **cron horaire** USGS :

```json
"path": "/api/external/usgs-sync",
"schedule": "0 * * * *"
```

Vercel envoie automatiquement `Authorization: Bearer <CRON_SECRET>` sur les crons si `CRON_SECRET` est défini.

> Cron Vercel : disponible sur les plans payants ; sur le plan Hobby, lancer la sync manuellement (étape 5).

---

## 4. Checklist post-déploiement

```bash
# Santé API
curl https://VOTRE-DOMAINE/api/health

# Sync séismes (première fois)
curl -X POST https://VOTRE-DOMAINE/api/external/usgs-sync \
  -H "Authorization: Bearer VOTRE_ADMIN_SYNC_SECRET"

# Sync complète (USGS + EMSC + cache)
curl -X POST https://VOTRE-DOMAINE/api/admin/data-refresh \
  -H "Authorization: Bearer VOTRE_ADMIN_SYNC_SECRET"
```

### Pages à tester dans le navigateur

- [ ] `/` — accueil, navigation, langues FR/KR/EN/ES
- [ ] `/carte` — carte + événements séismiques
- [ ] `/actualite` — graphiques et flux
- [ ] `/ville` — jeu + résultats
- [ ] `/auth/signin` — connexion (compte seed : `test@example.com` / `password123` si seed exécuté)
- [ ] `/api/health` — `{ "status": "ok" }`

---

## 5. Commandes utiles

| Commande | Usage |
|----------|--------|
| `npm run dev` | Développement local |
| `npm run build` | Build production |
| `npm test` | Tests unitaires |
| `npm run test:e2e` | Tests Playwright (local) |
| `npm run db:push` | Appliquer le schéma Prisma |
| `npm run db:seed` | Données de test |

### Sync en local (sans secret si `NODE_ENV !== production`)

```bash
curl -X POST http://localhost:3000/api/external/usgs-sync
```

En production, **toujours** passer le header :

```bash
-H "Authorization: Bearer $ADMIN_SYNC_SECRET"
# ou
-H "x-admin-sync-secret: $ADMIN_SYNC_SECRET"
```

---

## 6. Architecture déployée

```
Utilisateur
    │
    ▼
 Vercel (Next.js 16)
    ├── Pages / API Routes
    ├── proxy.ts (auth API diagnostics/simulations)
    └── Cron → /api/external/usgs-sync
    │
    ├── PostgreSQL (Prisma) — users, séismes, scores
    └── Redis (optionnel) — cache API
```

---

## 7. Limites connues

| Sujet | Détail |
|-------|--------|
| SSE temps réel | `/api/seismic/stream` peut se couper sur serverless (~60 s). Fallback polling côté client. |
| Redis absent | Pas bloquant ; cache désactivé, requêtes DB directes. |
| Mobile / RN | Code `shared/` et JWT mobile inactifs sur le site web — aucun impact deploy. |

---

## 8. Dépannage

**Build échoue sur Prisma**  
→ Vérifier que `postinstall` / `buildCommand` exécute `prisma generate`.

**Auth ne fonctionne pas**  
→ `NEXTAUTH_URL` doit correspondre exactement à l’URL du site (https, sans slash final).

**Carte vide**  
→ Lancer la sync USGS (étape 4). Vérifier `DATABASE_URL` et logs Vercel.

**401 sur sync**  
→ Vérifier `ADMIN_SYNC_SECRET` / `CRON_SECRET` et le header `Authorization: Bearer ...`.

**Connexion DB timeout**  
→ Utiliser l’URL avec `?sslmode=require` (Neon/Supabase). Autoriser les IP Vercel si firewall actif.

---

## 9. Prochaines étapes (optionnel)

- Domaine personnalisé dans Vercel
- Migrations Prisma versionnées (`prisma migrate dev`) avant grosse évolution schema
- CI GitHub Actions : `npm test && npm run build` sur chaque PR
- Monitoring (Vercel Analytics, Sentry)
