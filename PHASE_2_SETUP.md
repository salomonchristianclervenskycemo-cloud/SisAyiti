# Phase 2: Backend Database Setup - Implementation Guide

## ✅ Completed Tasks

### 1. Database Schema (prisma/schema.prisma)
- ✅ **User Model**: id, email (unique), password (hashed), name, role, timestamps
- ✅ **DiagnosticReport Model**: structure, foundation, condition, age, terrain, vulnerabilityScore, vulnerabilityLevel, recommendations, location data
- ✅ **GameScore Model**: game statistics with budget, buildings count, resilience metrics
- ✅ **Simulation Model**: lab simulations with configurable parameters (amplitude, frequency, duration, waveType)
- ✅ **SeismicEvent Model**: USGS earthquake data integration
- ✅ **DailyStatistics Model**: aggregated daily metrics

### 2. Prisma Client Setup (lib/db.ts)
- ✅ Singleton pattern to prevent connection exhaustion
- ✅ Development logging (query, error, warn)
- ✅ Both `db` and `prisma` exports for compatibility

### 3. Seed Data (prisma/seed.ts)
- ✅ Test user creation with bcrypt hashing
- ✅ Sample diagnostic reports
- ✅ Sample game scores
- ✅ Sample simulations
- ✅ Sample seismic events
- ✅ Error handling with graceful skip if data exists

### 4. Environment Configuration
- ✅ `.env.example` with all required variables
- ✅ `.env.local` with development defaults
- ✅ Database URL: `postgresql://postgres:postgres@localhost:5432/sisayiti_dev?schema=public`
- ✅ Redis URL: `redis://localhost:6379`
- ✅ NextAuth credentials configured

### 5. Docker Setup (docker-compose.yml)
- ✅ PostgreSQL 16 Alpine image
- ✅ Redis 7 Alpine image
- ✅ Health checks for both services
- ✅ Persistent volumes for data
- ✅ Network isolation

### 6. Package.json Scripts
- ✅ `db:generate` - Generate Prisma client
- ✅ `db:migrate` - Create and apply migrations
- ✅ `db:push` - Push schema without migration
- ✅ `db:seed` - Seed database with test data
- ✅ `db:reset` - Reset database completely

---

## 📋 Next Steps: Getting Started

### Step 1: Start Services with Docker Compose
```bash
docker compose up -d
```

This will start:
- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`

Verify services are running:
```bash
docker compose ps
```

### Step 2: Generate Prisma Client
```bash
npm run db:generate
```

This generates the TypeScript types and client from the schema.

### Step 3: Run Initial Migration
```bash
npm run db:migrate
```

You'll be prompted to name the migration (suggest: "init" or "initial_schema").

This creates:
- `prisma/migrations/` folder with migration files
- Database tables according to schema

### Step 4: Seed Database with Test Data
```bash
npm run db:seed
```

This creates:
- 2 test users (test@example.com, teacher@example.com)
- 2 diagnostic reports
- 1 game score
- 1 simulation
- 1 seismic event

### Step 5: Verify Setup
```bash
npx prisma studio
```

Opens interactive Prisma Studio at `http://localhost:5555` to view/manage your database.

---

## 🔍 Troubleshooting

### Connection Refused Error
- Verify Docker containers are running: `docker compose ps`
- Check PostgreSQL logs: `docker compose logs postgres`
- Ensure port 5432 is not in use by another service

### Migration Already Applied
- This is safe - Prisma tracks applied migrations
- Run `npm run db:migrate` again safely

### "bcrypt module not found"
- Run: `npm install bcryptjs`
- Or update seed.ts to use bcryptjs instead

### Want to Reset Everything
```bash
# Stop and remove containers
docker compose down

# Remove volumes to clear data
docker compose down -v

# Restart fresh
docker compose up -d

# Re-run migrations and seed
npm run db:migrate
npm run db:seed
```

---

## 📂 Phase 2 Files Created

```
sisyiti-app/
├── prisma/
│   ├── schema.prisma          ✨ Complete schema with all models
│   ├── seed.ts                ✨ Test data seeding
│   └── migrations/            📁 Will be created after first migrate
├── lib/
│   └── db.ts                  ✨ Prisma singleton client
├── .env.example               ✨ Environment template
├── .env.local                 ✨ Development environment
├── docker-compose.yml         ✨ Services orchestration
├── package.json               ✨ Updated with db scripts
└── PHASE_2_SETUP.md          ✨ This file
```

---

## 🚀 After Setup: Using the Database

### In API Routes
```typescript
// app/api/route.ts
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const user = await db.user.create({
    data: {
      email: 'example@test.com',
      password: hashedPassword,
      name: 'John Doe',
    },
  })
  return Response.json(user)
}
```

### In Server Components
```typescript
// app/page.tsx
import { db } from '@/lib/db'

export default async function Page() {
  const diagnostics = await db.diagnosticReport.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
  })
  
  return <div>{/* render diagnostics */}</div>
}
```

### With Prisma Studio
```bash
npx prisma studio
```
Opens visual editor for your database at http://localhost:5555

---

## ✨ What's Ready for Phase 3

With Phase 2 complete, you can now:
- ✅ Create/update/delete users
- ✅ Store diagnostic reports
- ✅ Track game scores
- ✅ Save simulations
- ✅ Access seismic event data

Next phase will add:
- 🔐 NextAuth.js authentication
- 🔌 API routes for diagnostics, scores, leaderboard
- 🎯 Protected endpoints
- 📊 Data validation with Zod

---

## 📚 Documentation Links

- [Prisma Docs](https://www.prisma.io/docs/)
- [Next.js Database Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Redis Docs](https://redis.io/docs/)
