'use client';

import type { FormEvent } from 'react';

import { ERROR_MESSAGES, ErrorCodes } from 'lib/errors/next-auth';
import { trpc } from 'lib/trpc/react';

import { signIn } from 'next-auth/react';

const SignUpForm = () => {
  const { mutateAsync: signUp } = trpc.auth.signup.useMutation();

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const credentials: Record<string, FormDataEntryValue> = {};

    const formDataEntries = Array.from(formData.entries());

    for (const [key, value] of formDataEntries) {
      credentials[key] = value;
    }

    try {
      const { id, name, email, password } = await signUp({
        name: credentials.name.toString(),
        email: credentials.email.toString().toLowerCase(),
        password: credentials.password.toString(),
      });

      // TODO: invoke toaster with successful message

      await signIn('credentials', {
        callbackUrl: '/',
        id,
        name,
        email,
        password,
      });
    } catch (error) {
      console.error(error);

      // TODO: invoke toaster instead with error messages
      console.error(
        error instanceof Error && ERROR_MESSAGES[error.message as keyof typeof ErrorCodes] // TODO: must check if `error.message` is a key in ErrorCodes
          ? ERROR_MESSAGES[error.message as keyof typeof ErrorCodes]
          : ERROR_MESSAGES[ErrorCodes.UNKNOWN_ERROR],
      );
    }
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
        <input type="password" name="password" id="password" />
      </div>

      <button
        type="submit"
        className="my-2 hover:opacity-90 duration-300 rounded-md p-2 text-sm bg-primary w-full"
      >
        Create account
      </button>
    </form>
  );
};

export default SignUpForm;
