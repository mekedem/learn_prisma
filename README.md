# learn_prisma

A small **Express** backend used to learn **Prisma ORM** with **PostgreSQL**. The app models users, movies, and per-user watchlist entries (status, optional rating and notes), and protects watchlist routes with **JWT** authentication.

## Stack

- **Runtime:** Node.js (ES modules)
- **Framework:** Express 5
- **Database:** PostgreSQL via Prisma Client with the [`@prisma/adapter-pg`](https://www.prisma.io/docs/orm/overview/databases/postgresql) driver adapter
- **Auth:** `jsonwebtoken`, `bcryptjs` (password hashing)
- **Validation:** Zod (watchlist request bodies)
- **Package manager:** pnpm

## Data model (high level)

- **User** — name, email, hashed password; can own movies and watchlist rows.
- **Movie** — title, overview, release year, genres, runtime, poster URL; linked to the creating user.
- **WatchlistItem** — one row per user + movie (`userId` + `movieId` unique), with `WatchlistStatus`: `PLANNED`, `WATCHED`, `COMPLETED`, `DROPPED`.

See `prisma/schema.prisma` for the full schema and relations.

## API surface

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/movies/hello` | No | Simple health-style JSON response |
| `POST` | `/auth/register` | No | Register; returns user data and JWT (also sets an HTTP-only `jwt` cookie) |
| `POST` | `/auth/login` | No | Login; returns token (and cookie) |
| `POST` | `/watchlist` | Yes | Add a movie to the authenticated user’s watchlist (body: `movieId`, optional `status`, `rating`, `notes`) |
| `DELETE` | `/watchlist/:movieId` | Yes | Remove a watchlist row. The handler looks up **`WatchlistItem.id`** by this path segment (the segment name in the route is `movieId`, but the value should be the watchlist item’s UUID) |

Protected routes accept either:

- `Authorization: Bearer <token>`, or  
- the `jwt` cookie set on login/register.

## Prerequisites

- Node.js (version compatible with the project’s dependencies)
- PostgreSQL
- [pnpm](https://pnpm.io/) (see `package.json` `devEngines` for the recommended major version)

## Environment variables

Create a `.env` in the project root (not committed) with at least:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string for Prisma |
| `JWT_SECRET` | Secret used to sign and verify JWTs |

Optional:

| Variable | Purpose |
|----------|---------|
| `JWT_EXPIRATION` | JWT lifetime (defaults to `7d` in token generation) |
| `NODE_ENV` | Set to `development` for more Prisma query logging |

## Setup

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Database** — apply your migrations (or `prisma db push` during prototyping) and generate the client:

   ```bash
   pnpm exec prisma generate
   ```

   Use `prisma migrate` or your usual workflow once `DATABASE_URL` is set.

3. **Run the dev server** (default port **5001**):

   ```bash
   pnpm run dev
   ```

4. **Optional — seed movies** (if you use the included seed script):

   ```bash
   pnpm run seed:movies
   ```

## Scripts

| Script | Command |
|--------|---------|
| Dev server (watch) | `pnpm run dev` |
| Seed movies | `pnpm run seed:movies` |

## Project layout (main areas)

- `src/server.js` — Express app, middleware, route mounting
- `src/config/db.js` — Prisma client and DB connect/disconnect
- `src/routes/` — Route modules (`auth`, `movies`, `watchlist`)
- `src/controllers/` — Request handlers
- `src/middleware/` — Auth and validation helpers
- `src/validators/` — Zod schemas
- `prisma/` — Schema, migrations, seeds

This repo is intentionally focused on practicing Prisma and a typical REST-style API shape; you can extend movie CRUD and watchlist listing as you go.
