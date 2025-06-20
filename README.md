# React Router v7 + Better Auth

An example application running React Router V7 (framework mode) + Better Auth.

## Features

- 🚀 **React Router v7** - Server-side rendering.
- 🔐 **Better Auth** - Authentication system with SQLite database (just for this example. Feel free to use any other database).
- 🔄 **Data loading and mutations** - Type-safe data handling
- 🎨 **Tailwindcss** - Styling with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+
- PNPM (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd rr-better-auth
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up the database**

   ```bash
   pnpm auth:migrate
   ```

 This will create the SQLite database (`sqlite.db`) and run necessary migrations.

4. **Generate auth types** (optional, for better TypeScript support)
 pnpm auth:generate

### Development

Start the development server with HMR:

```bash
pnpm dev
```

Your application will be available at `http://localhost:5173`.

### Authentication Flow

1. **Sign Up**: Navigate to `/auth/sign-up` to create a new account
2. **Sign In**: Navigate to `/auth/sign-in` to log in with existing credentials
3. **Protected Dashboard**: Access `/protected` to view user session data (requires authentication)
4. **Sign Out**: Use the sign out button in the protected dashboard

## Available Scripts

- `pnpm dev` - Start development server with HMR
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm auth:generate` - Generate Better Auth types
- `pnpm auth:migrate` - Run Better Auth database migrations

## Building for Production

Create a production build:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## Deployment

## Project Structure

```
├── app/
│   ├── components/         # Reusable UI components
│   │   └── ui/            # shadcn/ui components
│   ├── lib/               # Utility libraries
│   │   └── auth.ts        # Better Auth configuration
│   ├── routes/            # Application routes
│   │   ├── api/           # API endpoints
│   │   ├── auth/          # Authentication pages
│   │   ├── home.tsx       # Home page
│   │   └── protected.tsx  # Protected dashboard
│   ├── root.tsx           # Root component
│   └── routes.ts          # Route definitions
├── better-auth_migrations/ # Database migrations
├── sqlite.db              # SQLite database (generated)
├── react-router.config.ts # React Router configuration
└── package.json
```

## Authentication System

This template uses [Better Auth](https://better-auth.com/) which provides:

- **Email/Password Authentication** - Secure user registration and login
- **Session Management** - Automatic session handling and validation
- **SQLite Database** - Lightweight, file-based database for user data

### Auth Configuration

The auth system is configured in `app/lib/auth.ts`:

- Uses SQLite database for user storage
- Email/password authentication enabled
- Automatic session management

### Protected Routes

Routes are protected using the `loader` function pattern:

```typescript
export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    throw redirect(href('/auth/login'))
  }
  return { user: session.user }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/use-pg`)
3. Commit your changes (`git commit -m 'Add pg instead of sqlite'`)
4. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
