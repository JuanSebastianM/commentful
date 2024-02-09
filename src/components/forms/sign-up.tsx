'use client';

import type { FormEvent } from 'react';

import { signIn } from 'next-auth/react';

const SignUpForm = () => {
  const handleFormSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const credentials: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      credentials[key] = value;
    }

    await signIn('credentials', {
      callbackUrl: '/',
      ...credentials,
    });
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mt-2">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>

      <div className="mt-2">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>

      <div className="mt-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
        />
      </div>

      <button
        type="submit"
        className="mt-2 hover:opacity-90 duration-300 rounded-md p-2 text-sm bg-primary w-full"
      >
        Create account
      </button>
    </form>
  );
};

export default SignUpForm;
