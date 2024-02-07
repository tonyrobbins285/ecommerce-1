import Link from 'next/link';
import React from 'react';
import { LoginForm } from './components/login-form';

export default function SignInPage() {
  return (
    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
        Sign in to your account
      </h1>
      {/* <form className="flex flex-col justify-center gap-4 md:gap-6" action="#">
   
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="confirm-password"
            name="confirm-password"
            id="confirm-password"
            placeholder="••••••••"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-300 dark:border-gray-600  dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="text-gray-500 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>
          <Link
            href="/reset-password"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="focus:ring-primary-300 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Sign in
        </button>
      </form> */}
      <LoginForm />
      <p className="space-x-1 text-sm font-light text-gray-500 dark:text-gray-400">
        <span>Don’t have an account yet?</span>
        <Link
          href="/sign-up"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
