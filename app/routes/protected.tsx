import { auth } from "~/lib/auth";
import type { Route } from "./+types/protected";
import { href, redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    throw redirect(href("/"));
  }

  return {
    user: session.user,
  };
}

export default function Protected({ loaderData }: Route.ComponentProps) {
  return (
    <>
      Hello, User!
      {JSON.stringify(loaderData.user)}
    </>
  );
}
