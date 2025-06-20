import { auth } from "~/lib/auth";
import type { Route } from "./+types/protected";
import { href, redirect, Link, Form } from "react-router";
import { Button } from "~/components/ui/button";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    throw redirect(href("/auth/login"));
  }

  return {
    user: session.user,
    session: session,
  };
}

export async function action({ request }: Route.ActionArgs) {
  await auth.api.signOut({
    headers: request.headers,
  });

  throw redirect(href("/"));
}

export default function Protected({ loaderData }: Route.ComponentProps) {
  const { user, session } = loaderData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Protected Dashboard
              </h1>
              <Form method="post">
                <Button type="submit" variant="outline">
                  Sign Out
                </Button>
              </Form>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Welcome back, {user.email}!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  You're successfully authenticated and viewing a protected
                  page.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    User Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        ID:
                      </span>
                      <span className="text-gray-900 dark:text-white font-mono">
                        {user.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Email:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {user.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Verified:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {user.emailVerified ? "Yes" : "No"}
                      </span>
                    </div>
                    {user.name && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Name:
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          {user.name}
                        </span>
                      </div>
                    )}
                    {user.image && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Avatar:
                        </span>
                        <img
                          src={user.image}
                          alt="User avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Session Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Session ID:
                      </span>
                      <span className="text-gray-900 dark:text-white font-mono text-xs">
                        {session.session?.id?.slice(0, 16)}...
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Expires:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {session.session?.expiresAt
                          ? new Date(
                              session.session.expiresAt,
                            ).toLocaleDateString()
                          : "Never"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Created:
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {session.session?.createdAt
                          ? new Date(
                              session.session.createdAt,
                            ).toLocaleDateString()
                          : "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
                  Navigation
                </h3>
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
