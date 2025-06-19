import type { RouteConfig } from "@react-router/dev/routes";
import { index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth/login", "routes/auth/sign-in.tsx"),
  route("auth/register", "routes/auth/sign-up.tsx"),
  route("protected", "routes/protected.tsx"),
  // Better Auth API routes
  ...prefix("api", [route("auth/*", "routes/api/auth.tsx")]),
] satisfies RouteConfig;
