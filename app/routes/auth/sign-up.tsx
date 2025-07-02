import type { Route } from './+types/sign-up'
import { Form, href, Link, redirect, useActionData } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { auth } from '~/lib/auth'

export async function loader() {
  return {}
}

export async function action({ request }: Route.LoaderArgs) {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

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
    })

    return redirect(href('/'), {
      headers: response.headers,
    })
  }
  catch (error) {
    console.error('Sign-up error:', error)
    return {
      error: 'An error occurred during sign-up. Please try again.',
    }
  }
}

export default function SignUp() {
  const actionData = useActionData<typeof action>()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or
            {' '}
            <Link
              to="/auth/sign-in"
              className="font-medium text-primary hover:text-primary/80"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form method="post" className="space-y-6">
            {actionData?.error && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                <div className="text-sm text-red-700 dark:text-red-300">
                  {actionData.error}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Create a password"
              />
            </div>

            <div>
              <Button type="submit" className="w-full" size="lg">
                Create account
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
