# Phase 3: Authentication & API Routes - Implementation Guide

## ✅ Completed Tasks

### 1. NextAuth Configuration (lib/auth.ts)
- ✅ CredentialsProvider with email/password authentication
- ✅ bcryptjs password hashing and verification
- ✅ JWT session strategy (30 days)
- ✅ Callback functions for JWT and session management
- ✅ User role included in session and JWT token

### 2. NextAuth Route Handler (app/api/auth/[...nextauth]/route.ts)
- ✅ GET and POST handlers for authentication
- ✅ Integrated with authOptions from lib/auth.ts
- ✅ Ready for sign-in, sign-out, session checks

### 3. Diagnostic API (app/api/diagnostics/route.ts)
- ✅ **POST /api/diagnostics**: Create new diagnostic reports
  - Validates input with Zod schema
  - Calculates vulnerability score (1-4 scale)
  - Assigns vulnerability level (resilient/moderate/vulnerable)
  - Requires authentication
  - Returns saved report with ID

- ✅ **GET /api/diagnostics**: Retrieve user's diagnostic reports
  - Requires authentication (user-specific)
  - Returns all user's reports ordered by date
  - Query param `userOnly=true` for personal reports only
  - Caches global statistics in Redis (10 minutes)

### 4. Leaderboard API (app/api/scores/leaderboard/route.ts)
- ✅ **GET /api/scores/leaderboard**: Public leaderboard
  - Caches results in Redis (5 minutes)
  - Supports filtering by difficulty
  - Limit parameter (max 100, default 50)
  - Returns ranking with resilience percentage
  - No authentication required

### 5. Validation Schemas (lib/validations.ts)
- ✅ **diagnosticReportSchema**: Validates diagnostic input
- ✅ **gameScoreSchema**: Validates game score submission
- ✅ **simulationSchema**: Validates simulation parameters
- ✅ **userRegistrationSchema**: Validates user signup

### 6. Redis Integration (lib/redis.ts)
- ✅ **getCache<T>(key)**: Retrieve cached data with TypeScript typing
- ✅ **setCache(key, value, ttlSeconds)**: Store data with TTL
- ✅ **invalidateCache(key)**: Delete cached data
- ✅ Graceful fallback if Redis unavailable
- ✅ Connection pooling and retry logic

### 7. Environment Configuration
- ✅ REDIS_URL in .env.local
- ✅ NEXTAUTH_SECRET in .env.local
- ✅ NEXTAUTH_URL in .env.local (http://localhost:3000)

---

## 📊 API Endpoints Reference

### Authentication
```bash
# Sign in
POST /api/auth/callback/credentials
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Diagnostics
```bash
# Create diagnostic report
POST /api/diagnostics
Authorization: Bearer <session-token>
Content-Type: application/json

{
  "structure": "concrete_unreinforced",
  "foundation": "poor",
  "condition": "fair",
  "age": "moderate",
  "terrain": "slope",
  "latitude": 18.971,
  "longitude": -72.285,
  "district": "Port-au-Prince"
}

# Retrieve user's diagnostics
GET /api/diagnostics
Authorization: Bearer <session-token>

# Get global statistics
GET /api/diagnostics?userOnly=false
```

### Game Scores
```bash
# Leaderboard (public)
GET /api/scores/leaderboard?limit=50&difficulty=medium

Response:
{
  "leaderboard": [
    {
      "rank": 1,
      "playerName": "Player1",
      "finalBudget": 150000,
      "buildingsConstructed": 8,
      "resilientBuildings": 6,
      "resilientPercentage": 75,
      "difficulty": "medium",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 50,
  "fromCache": true
}
```

---

## 🔐 Authentication Flow

### 1. User Signs Up
```typescript
// lib/validations.ts - userRegistrationSchema validates:
// - email (valid email format)
// - password (min 8 chars)
// - name (2-100 chars)

// Future: app/api/auth/register (to be created)
```

### 2. User Signs In
```typescript
// Via NextAuth credentials provider
// Email + password sent to /api/auth/callback/credentials
// Password verified with bcrypt against DB
// JWT token generated with user.id and user.role
// Session stored in user's browser/session storage
```

### 3. Protected Requests
```typescript
// In API routes:
const session = await getServerSession(authOptions)
if (!session?.user?.email) {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}
```

### 4. Session Data Available in Components
```typescript
// On client side (requires 'use client')
import { useSession } from 'next-auth/react'

export default function Component() {
  const { data: session } = useSession()
  
  // session.user.email
  // session.user.name
  // session.user.id
  // session.user.role
}
```

---

## 💾 Data Caching Strategy

### Diagnostic Statistics (Global)
- **Cache Key**: `global_diagnostics_stats`
- **TTL**: 600 seconds (10 minutes)
- **Invalidation**: Automatically when new diagnostic is saved
- **Data**: Total count, resilient/moderate/vulnerable breakdown, percentages

### Leaderboard
- **Cache Key**: `leaderboard:${difficulty}:${limit}`
- **TTL**: 300 seconds (5 minutes)
- **Data**: Top scores with rankings and resilience percentages

### Why Redis?
- ⚡ In-memory database (microsecond response)
- 📊 Avoids expensive database queries for frequently accessed data
- 🔄 Automatic TTL expiration
- 🌐 Shared across all server instances

---

## 🚀 Usage in Components

### Example: Diagnostic Form Submission
```typescript
// components/module-multirisques.tsx
const handleSubmitDiagnostic = async (formData) => {
  const response = await fetch('/api/diagnostics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    throw new Error('Failed to save diagnostic')
  }

  const report = await response.json()
  return report
}
```

### Example: Loading Leaderboard
```typescript
// components/module-ville.tsx or a new game component
const [leaderboard, setLeaderboard] = useState([])

useEffect(() => {
  const fetchLeaderboard = async () => {
    const response = await fetch('/api/scores/leaderboard?limit=50')
    const data = await response.json()
    setLeaderboard(data.leaderboard)
  }

  fetchLeaderboard()
}, [])
```

### Example: Checking Authentication
```typescript
// In server components
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return <div>Welcome, {session.user?.name}</div>
}
```

---

## ✨ Next: Phase 4 - Infrastructure

The API foundation is now complete! Phase 4 will add:

1. **Docker Deployment**
   - Dockerfile with multi-stage build
   - Production environment variables
   - Health checks and logging

2. **Redis Client Setup** (Already done: lib/redis.ts)
   - Integrated with API routes
   - Caching strategies defined

3. **Initialization Scripts**
   - Docker Compose for local development
   - Database seeding for test data

4. **Environment Configuration**
   - Production vs development configs
   - Security hardening (HTTPS, CSP headers)

---

## 🐛 Troubleshooting

### NextAuth Not Working
```bash
# Verify environment variables
echo $NEXTAUTH_SECRET
echo $NEXTAUTH_URL

# Check database connection
npm run db:seed

# Restart dev server
npm run dev
```

### Redis Cache Not Working
```bash
# Check Redis is running
docker compose ps

# Connect to Redis directly
docker compose exec redis redis-cli ping
# Should respond: PONG

# Check cache keys
docker compose exec redis redis-cli KEYS "leaderboard:*"
```

### API Returns 401 Unauthorized
```typescript
// Ensure session is valid
const session = await getServerSession(authOptions)
console.log('Session:', session)

// Check token in browser DevTools
// Application > Cookies > __Secure-next-auth.session-token
```

---

## 📂 Phase 3 Files Created/Updated

```
sisyiti-app/
├── app/api/
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts           ✨ NextAuth handler
│   ├── diagnostics/
│   │   └── route.ts               ✨ Diagnostic CRUD endpoints
│   └── scores/
│       └── leaderboard/
│           └── route.ts           ✨ Public leaderboard
├── lib/
│   ├── auth.ts                    ✨ NextAuth configuration
│   ├── db.ts                      ✅ (from Phase 2)
│   ├── redis.ts                   ✅ (updated with validation)
│   └── validations.ts             ✨ Zod schemas
├── .env.local                     ✅ (updated with NEXTAUTH vars)
└── PHASE_3_API_ROUTES.md          ✨ This file
```

---

## 📚 Documentation Links

- [NextAuth.js Docs](https://next-auth.js.org/)
- [NextAuth Credentials Provider](https://next-auth.js.org/providers/credentials)
- [Zod Validation](https://zod.dev/)
- [Redis Caching Patterns](https://redis.io/docs/manual/client-side-caching/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
