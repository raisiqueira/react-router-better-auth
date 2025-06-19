import { auth } from "~/lib/auth";
import type { Route } from "./+types/sign-up";
import { Form, href, redirect } from "react-router";

export async function loader() {
  return {};
}

export async function action({ request }: Route.LoaderArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await auth.api.signUpEmail({
      request,
      headers: request.headers,
      returnHeaders: true,
      body: {
        name,
        email,
        password,
      },
    });

    console.log("result: ", response);
    return redirect(href("/"), {
      headers: response.headers,
    });
  } catch (error) {
    return {
      error: "Error during the sign-up",
    };
  }
}

export default function SignIn() {
  return (
    <>
      <Form method="post">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <button type="submit">Save</button>
      </Form>
    </>
  );
}
