# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Router v7 application integrated with Better Auth for authentication. The project uses:
- React Router v7 with SSR enabled
- Better Auth with SQLite database for authentication
- TailwindCSS for styling
- TypeScript throughout
- PNPM as package manager

## Common Commands

### Development
```bash
pnpm dev                # Start development server with HMR
pnpm build              # Build for production
pnpm start              # Start production server
pnpm typecheck          # Run TypeScript type checking
pnpm lint:fix           # Run ESLint with auto-fix
```

### Authentication
```bash
pnpm auth:generate      # Generate Better Auth types
pnpm auth:migrate       # Run Better Auth migrations
```

## Architecture

### Authentication System
- **Auth Configuration**: `app/lib/auth.ts` - Better Auth setup with SQLite database
- **Auth API Handler**: `app/routes/api/auth.tsx` - Handles all auth requests via Better Auth handler
- **Auth Routes**: `app/routes/auth/` - Sign-in and sign-up pages
- **Database**: Uses SQLite (`sqlite.db`) with migrations in `better-auth_migrations/`

### Route Structure
- **API Routes**: `app/routes/api/` - Backend API endpoints
- **Auth Routes**: `app/routes/auth/` - Authentication pages
- **Protected Routes**: Routes like `protected.tsx` require authentication
- **Public Routes**: `home.tsx` and others are publicly accessible

### Key Files
- `app/root.tsx` - Root component with global setup
- `app/routes.ts` - Route definitions
- `react-router.config.ts` - React Router configuration (SSR enabled)
- `app/lib/auth.ts` - Better Auth configuration

### Development Notes
- Uses `~/*` path alias for `./app/*` imports
- ESLint configured with @antfu/eslint-config
- TailwindCSS configured via Vite plugin
- TypeScript strict mode enabled