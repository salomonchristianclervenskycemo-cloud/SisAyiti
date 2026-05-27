# 🚀 Getting Started with SisAyiti

Welcome to the SisAyiti project! This guide will help you get up and running quickly.

## ⚡ 5-Minute Quick Start

```bash
# 1. Navigate to project
cd sisyiti-app

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env.local

# 4. Start PostgreSQL + Redis
docker compose up -d

# 5. Initialize database
npm run db:migrate
npm run db:seed

# 6. Start dev server
npm run dev

# 7. Open browser
# http://localhost:3000
```

**Test Login**:
- Email: `test@example.com`
- Password: `password123`

---

## 📊 What's Already Built

✅ **Phase 1**: Beautiful UI with WCAG AAA+ colors  
✅ **Phase 2**: PostgreSQL database with 6 models  
✅ **Phase 3**: 10 API endpoints with authentication  
✅ **Phase 4**: Production Docker setup  

**67% Complete** - See [WORK_COMPLETED.md](WORK_COMPLETED.md) for details.

---

## 📚 Documentation Structure

**Start with ONE of these**:

1. **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - Navigation menu (Best for new developers)
2. **[WORK_COMPLETED.md](WORK_COMPLETED.md)** - What's been built (Best for overview)
3. **[ROADMAP.md](ROADMAP.md)** - Full project timeline (Best for planning)

Then read phase-specific guides:

- [PHASE_2_SETUP.md](PHASE_2_SETUP.md) - Database details
- [PHASE_3_API_ROUTES.md](PHASE_3_API_ROUTES.md) - API reference
- [PHASE_4_INFRASTRUCTURE.md](PHASE_4_INFRASTRUCTURE.md) - Deployment

---

## 🔧 Essential Commands

### Development
```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Build for production
npm run lint      # Check code quality
```

### Database
```bash
npm run db:migrate   # Apply migrations
npm run db:seed      # Load test data
npm run db:reset     # Full database reset
npm run db:generate  # Generate Prisma client
```

### Docker
```bash
docker compose up -d      # Start services (PostgreSQL, Redis)
docker compose down       # Stop services
docker compose logs -f    # View logs
docker compose ps         # Check status
```

### Testing
```bash
curl http://localhost:3000/api/health  # Check if services running
```

---

## 🧪 Test the Application

### 1. Sign In
Visit `http://localhost:3000/auth/signin`
```
Email: test@example.com
Password: password123
```

### 2. Create a Diagnostic
```bash
curl -X POST http://localhost:3000/api/diagnostics \
  -H "Content-Type: application/json" \
  -H "Cookie: <session-cookie>" \
  -d '{
    "structure": "concrete_unreinforced",
    "foundation": "poor",
    "condition": "fair",
    "age": "moderate",
    "terrain": "slope"
  }'
```

### 3. View Leaderboard
```bash
curl http://localhost:3000/api/scores/leaderboard
```

### 4. Check Health
```bash
curl http://localhost:3000/api/health
```

---

## 🎯 Common Tasks

### Add a New API Endpoint

1. Create file: `app/api/myfeature/route.ts`
2. Add Zod schema to `lib/validations.ts`
3. Implement GET/POST handlers
4. Add to `middleware.ts` if protected
5. Document in `PHASE_3_API_ROUTES.md`

### Modify Database Schema

1. Edit `prisma/schema.prisma`
2. Run `npm run db:migrate`
3. Name the migration (e.g., "add_user_role")
4. Check `prisma/migrations/` folder

### Add a UI Component

1. Create component in `components/`
2. Use Tailwind CSS with theme tokens
3. Test in both light/dark modes
4. Update color if using custom shades

### Deploy to Production

1. Build image: `docker build -t sisayiti:latest .`
2. Push to registry: `docker push registry/sisayiti:latest`
3. Deploy to platform (Railway, AWS, etc.)
4. Set environment variables
5. Run migrations: `npm run db:migrate`

---

## 🆘 Troubleshooting

### "Cannot connect to database"
```bash
# Check Docker is running
docker compose ps

# Restart services
docker compose down
docker compose up -d

# Check connection string in .env.local
cat .env.local | grep DATABASE_URL
```

### "Port 3000 already in use"
```bash
# Find process using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### "Module not found"
```bash
# Regenerate Prisma client
npm run db:generate

# Check TypeScript paths in tsconfig.json
# Should have: "@/*": ["./*"]
```

### "Redis connection error"
```bash
# This is OK! Redis is optional
# App will work without it (no caching)

# But if you need it:
docker compose logs redis
```

---

## 📞 Need Help?

1. **For setup issues**: See [BUILD_STATUS.md](BUILD_STATUS.md#-troubleshooting)
2. **For API questions**: See [PHASE_3_API_ROUTES.md](PHASE_3_API_ROUTES.md)
3. **For database issues**: See [PHASE_2_SETUP.md](PHASE_2_SETUP.md#-troubleshooting)
4. **For deployment**: See [PHASE_4_INFRASTRUCTURE.md](PHASE_4_INFRASTRUCTURE.md#-troubleshooting-production-issues)

---

## 📈 Next Steps

### Short Term (This Week)
- [ ] Get dev environment running (30 min)
- [ ] Test authentication flow (15 min)
- [ ] Explore API endpoints (30 min)
- [ ] Review database schema (20 min)

### Medium Term (This Month)
- [ ] Start Phase 5: Testing (3-4 hours)
- [ ] Create unit tests for utilities
- [ ] Create integration tests for APIs
- [ ] Achieve 80%+ test coverage

### Long Term (Next Month)
- [ ] Complete Phase 6: Deployment
- [ ] Set up CI/CD pipeline
- [ ] Configure monitoring (Sentry)
- [ ] Deploy to production

---

## 📚 Learning Resources

**Official Documentation**:
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)

**Video Tutorials**:
- [Next.js Full Course](https://www.youtube.com/watch?v=XbwH6fMc5pA)
- [Prisma Tutorial](https://www.youtube.com/watch?v=rLwWZWHgVBA)
- [NextAuth.js Setup](https://www.youtube.com/watch?v=xY2k9FIakq4)

**Articles**:
- [Next.js Best Practices](https://nextjs.org/learn/foundations/about-nextjs)
- [Prisma Tips & Tricks](https://www.prisma.io/docs/orm/more/help-and-troubleshooting)
- [API Route Design](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## ✅ Checklist: First Day

- [ ] Read this guide (15 min)
- [ ] Clone/open project
- [ ] Run `npm install` (5 min)
- [ ] Setup .env.local
- [ ] Start Docker services
- [ ] Run database setup
- [ ] Start `npm run dev`
- [ ] Test sign-in page
- [ ] Read [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) (20 min)
- [ ] Explore codebase

**Total Time**: ~1 hour for full setup

---

## 💡 Pro Tips

1. **Use Prisma Studio** to visualize database
   ```bash
   npx prisma studio
   # Opens http://localhost:5555
   ```

2. **Keep Docker running** in background
   ```bash
   docker compose up -d
   # Does not block terminal
   ```

3. **Check build before pushing**
   ```bash
   npm run build && npm run lint
   ```

4. **Watch for Redis debug info**
   ```bash
   docker compose logs redis | grep -i error
   ```

5. **Test API endpoints** with curl or Postman
   ```bash
   curl http://localhost:3000/api/health
   ```

---

## 🎓 Project Goals

1. **Education**: Teach Haitian citizens about seismic risk
2. **Assessment**: Help evaluate building vulnerability
3. **Engagement**: Interactive games and simulations
4. **Community**: Share knowledge and tips
5. **Resilience**: Promote disaster preparedness

---

**Ready to get started?** → Start with `npm run dev` and enjoy building! 🚀

**Need docs?** → Head to [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

**Questions?** → Check the relevant phase documentation or troubleshooting section
