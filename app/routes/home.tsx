import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { auth } from "~/lib/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  console.log("has session (homepage)? ", session);
}

export default function Home() {
  return <Welcome />;
}
