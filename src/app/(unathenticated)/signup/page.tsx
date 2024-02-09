import type { FormEvent } from 'react';

import Link from 'next/link';

import SignUpForm from '~/components/forms/sign-up';

const SignUpPage = () => {
  return (
    <div>
      <h1>Create a new account</h1>

      <SignUpForm />

      <p>
        Already have an account?{' '}
        <Link
          href="/signin"
          className="text-primary hover:opacity-80"
        >
          Sign in instead
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
