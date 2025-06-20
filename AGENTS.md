# AGENTS.md

## Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production  
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm auth:generate` - Generate Better Auth types
- `pnpm auth:migrate` - Run Better Auth migrations
- No test framework configured - check with user before adding tests

## Code Style
- Uses @antfu/eslint-config with React + TypeScript
- Import alias: `~/*` maps to `./app/*`
- Strict TypeScript mode enabled
- Double quotes for strings, semicolons required
- React Router v7 patterns: use `Route.ActionArgs`, `Route.LinksFunction` types
- Better Auth integration: import from `~/lib/auth`
- Error handling: try/catch with console.log for debugging, return error objects
- File naming: kebab-case for routes, PascalCase for components
- Use `type` imports when importing only types
- TailwindCSS for styling with utility classes