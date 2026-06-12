# Déploiement SisAyiti (Vercel)

## Prérequis

- Compte [Vercel](https://vercel.com)
- Base **PostgreSQL** (Neon, Supabase, ou Vercel Postgres)
- **Redis** optionnel (Upstash) pour cache leaderboard / stats

## Variables d’environnement

Copier depuis `.env.example` :

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `DATABASE_URL` | Oui | URL PostgreSQL (`?sslmode=require` en cloud) |
| `NEXTAUTH_SECRET` | Oui | Secret aléatoire 32+ caractères |
| `NEXTAUTH_URL` | Oui | URL prod ex. `https://sisayiti.vercel.app` |
| `REDIS_URL` | Non | Cache ; sans Redis les routes fonctionnent plus lentement |
| `USGS_API_BASE` | Non | Défaut USGS public |

## Étapes Vercel

1. Importer le dépôt, **Root Directory** : `sisyiti-app`
2. **Framework** : Next.js (détection auto)
3. **Build Command** : `npm run build` (postinstall exécute `prisma generate`)
4. Ajouter les variables ci-dessus dans *Settings → Environment Variables*
5. Après le premier déploiement, exécuter localement ou via CI :

```bash
npx prisma db push
npm run db:seed   # données de démo (optionnel)
```

## Routes critiques à tester en prod

- `GET /api/health`
- `GET /api/scores/leaderboard`
- `GET/POST /api/community-reports`
- `POST /api/diagnostics`

## PWA

Le fichier `app/manifest.ts` expose `/manifest.webmanifest`. Sur mobile : *Ajouter à l’écran d’accueil*.

## Fichiers fallback (sans DB)

- Signalements : `data/community-reports.json` (écriture serveur — en serverless Vercel préférer PostgreSQL)

## Checklist jury / démo

Voir [DEMO.md](./DEMO.md).

## Docker (alternative)

```bash
docker compose up -d
npm run build
npm start
```

Image multi-stage décrite dans `PHASE_4_INFRASTRUCTURE.md`.
