# 🌍 SisAyiti - Haitian Seismic Risk Education Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.8.0-success)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-success)](https://www.postgresql.org/)

A comprehensive web platform designed to educate Haitian citizens about seismic risk, assess building vulnerability, and promote disaster resilience through interactive games and simulations.

**Status**: ✨ **70% Complete - MVP jury-ready (Phases 2-4 + P1/P2)**

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your configuration

# 3. Start services
docker compose up -d

# 4. Initialize database
npm run db:generate
npm run db:migrate
npm run db:seed

# 5. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Test Credentials**:
- Email: `test@example.com`
- Password: `password123`

---

## 📚 Documentation

**Start here**: [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - Navigation guide for all docs

| Document | Purpose |
|----------|---------|
| [WORK_COMPLETED.md](WORK_COMPLETED.md) | What's been built |
| [ROADMAP.md](ROADMAP.md) | Full project timeline |
| [PHASE_2_SETUP.md](PHASE_2_SETUP.md) | Database setup |
| [PHASE_3_API_ROUTES.md](PHASE_3_API_ROUTES.md) | API reference |
| [PHASE_4_INFRASTRUCTURE.md](PHASE_4_INFRASTRUCTURE.md) | Deployment guide |
| [DEMO.md](DEMO.md) | Jury demo walkthrough (~10 min) |
| [DEPLOY.md](DEPLOY.md) | Vercel + environment checklist |

---

## ✨ Key Features

- ✅ **OKLCH Color Space** - WCAG AAA+ accessible colors
- ✅ **Dark/Light Mode** - Automatic theme switching
- ✅ **Secure Authentication** - NextAuth.js with JWT
- ✅ **PostgreSQL Database** - Prisma ORM
- ✅ **Redis Caching** - 5-100x performance boost
- ✅ **Docker Ready** - Multi-stage production build
- ✅ **API Routes** - 10+ endpoints
- ✅ **Health Checks** - Service monitoring

---

## 🏗️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Backend**: Node.js, Next.js API Routes, NextAuth.js
- **Database**: PostgreSQL 16, Prisma 7
- **Cache**: Redis 7
- **Deployment**: Docker, Docker Compose

---

## 📊 Project Status

| Phase | Component | Status | Docs |
|-------|-----------|--------|------|
| 1 | UI/UX & Light Mode | ✅ | LIGHT_MODE_IMPROVEMENTS.md |
| 2 | Database | ✅ | PHASE_2_SETUP.md |
| 3 | Auth & APIs | ✅ | PHASE_3_API_ROUTES.md |
| 4 | Infrastructure | ✅ | PHASE_4_INFRASTRUCTURE.md |
| 5 | Testing | 📋 | Planned |
| 6 | Deployment | 📋 | Planned |

**Progress**: 70% (4/6 phases + P1/P2 jury items)

**Recent (P1/P2)**: API signalements communautaires, E2E parcours clés, `DEMO.md` / `DEPLOY.md`, PWA manifest, certificat Comprendre, export diagnostic, classement Ville.

---

## 🔗 API Endpoints

```
POST   /api/auth/register              # Register
POST   /api/auth/callback/credentials  # Sign in
GET    /api/diagnostics                # Get diagnostics
POST   /api/diagnostics                # Create diagnostic
GET    /api/scores                     # Get scores
POST   /api/scores                     # Save score
GET    /api/scores/leaderboard         # Public leaderboard
GET    /api/simulations                # Get simulations
POST   /api/simulations                # Save simulation
GET    /api/health                     # Health check
```

Full details: [PHASE_3_API_ROUTES.md](PHASE_3_API_ROUTES.md)

---

## 🐳 Docker

```bash
# Start PostgreSQL + Redis
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Build production image
docker build -t sisayiti:latest .
```

---

## 🧪 Development Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run db:*      # Database commands
```

---

## 📖 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 📄 License

MIT License - See LICENSE file for details

---

**Version**: 0.1.0  
**Last Updated**: May 22, 2026  
**Maintained By**: SisAyiti Development Team
