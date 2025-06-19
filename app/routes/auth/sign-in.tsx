import { Form, href, redirect } from "react-router";
import type { Route } from "./+types/sign-in";
import { auth } from "~/lib/auth";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await auth.api.signInEmail({
      request,
      headers: request.headers,
      returnHeaders: true,
      body: {
        email,
        password,
      },
    });

    return redirect(href("/"), {
      headers: response.headers,
    });
  } catch (error) {
    console.log("error: ", error);
    return {
      error: "error during the login",
    };
  }
}

export default function SignIn() {
  return (
    <>
      <Form method="post">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" />
        <button type="submit">Login</button>
      </Form>
    </>
  );
}
