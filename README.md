# CaloriePal

A fitness RPG web application that turns health tracking into a game. Users earn XP, level up, maintain streaks, complete daily quests, and spend coins in an in-app shop — all by logging real workouts and nutrition.

**Live:** [caloriepal-web.vercel.app](https://caloriepal-web.vercel.app)

---

## What it does

- **Quests** — Daily challenges across Training, Nutrition, and Mindset categories. Completing quests awards XP and coins.
- **Gamification** — XP-based leveling system with titles, player streaks, a longest-streak record, and a coin economy.
- **Nutrition tracking** — Log meals by searching a food database or entering macros manually. Daily calories, protein, carbs, and fat tracked against goals.
- **Workout logging** — Search exercises, log sessions with sets/reps/weight or duration/distance, track weekly goals and time trained.
- **Shop** — Spend coins on Streak Freezes to protect your streak on rest days.
- **Streak calendar** — 28-day visual history of activity, freeze count, current and longest streak.

---

## Architecture

Full-stack, two separate deployments:

```
caloriepal-web   (this repo)      →  Vercel
caloriepal-api   (sibling repo)   →  Railway
                                     PostgreSQL on Railway
```

The frontend never talks to the database directly. All mutations go through the REST API. Auth is handled by Supabase (Google OAuth) with JWTs validated on the backend.

---

## Tech stack

### Frontend
| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | Supabase OAuth (Google) via `@supabase/ssr` |
| Icons | Iconify, Lucide |
| Animations | Framer Motion |
| Deployment | Vercel |

### Backend ([caloriepal-api](https://github.com/tonymocanu97/caloriepal-api))
| | |
|---|---|
| Framework | ASP.NET Core 10 |
| Language | C# |
| Architecture | Clean Architecture (Domain / Application / Infrastructure / API) |
| Pattern | CQRS with MediatR |
| ORM | Entity Framework Core 10 + Npgsql |
| Database | PostgreSQL |
| Auth | JWT Bearer — Supabase ES256 tokens validated via JWKS |
| Deployment | Railway |

---

## Project structure

```
src/
├── app/
│   ├── (main)/              # Protected layout (Sidebar + Topbar)
│   │   ├── dashboard/       # XP, quests, streak calendar, activity log
│   │   ├── quests/          # Quest board with category filters
│   │   ├── nutrition/       # Meal logging, macro tracking
│   │   ├── workouts/        # Workout sessions, exercise search
│   │   ├── shop/            # Coin shop (Streak Freeze)
│   │   └── settings/        # Profile management
│   ├── auth/
│   │   ├── callback/        # Supabase OAuth callback
│   │   └── logout/          # Sign out handler
│   └── api/auth/token/      # Server-side token endpoint
├── components/
│   ├── Sidebar/             # Navigation, logout
│   └── Topbar/              # Page title
├── models/                  # TypeScript DTOs
└── utils/
    ├── api.ts               # All API calls (token-cached, deduplicated)
    └── supabase/            # Client + server Supabase clients
```

---

## Notable implementation details

**Auth flow** — Uses `@supabase/ssr` with a server-side `/api/auth/token` route. Client-side code fetches this endpoint to get the access token rather than reading browser cookies directly — a workaround for how Supabase SSR cookies behave in Vercel's edge environment.

**Token caching** — The JWT is cached client-side and reused until 60 seconds before expiry. Concurrent API calls share a single in-flight token request rather than each fetching independently.

**Logout as button** — The logout link in the sidebar is a `<button>` rather than a Next.js `<Link>`. Using `<Link>` caused Next.js to prefetch the route on render, which actually executed the logout handler.

**Backend JWT validation** — Supabase issues ES256 (asymmetric) tokens. The backend fetches Supabase's JWKS at startup and uses the EC public keys directly — no shared secret needed.

**Optimistic updates** — Quest completion, meal logging, and workout logging update the UI immediately before the API responds. On error, state is rolled back with a full refetch.

---

## Local setup

### Prerequisites
- Node.js 18+
- A Supabase project with Google OAuth enabled
- The [backend API](https://github.com/tonymocanu97/caloriepal-api) running locally or pointed at Railway

### Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=https://localhost:7066
```

### Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Roadmap

- Achievements & badges
- Progress charts (XP over time, streak history, macro trends)
- Global leaderboard
- Weekly and Epic quest types
- Custom quest creation
