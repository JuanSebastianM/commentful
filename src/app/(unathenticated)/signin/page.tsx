import Link from 'next/link';

import SignInForm from '~/components/forms/sign-in';

const SignInPage = async () => {
  return (
    <div>
      <h1>Sign in with email</h1>

      <SignInForm />

      <p>
        Don't have an account yet?{' '}
        <Link href="/signup" className="text-primary hover:opacity-80">
          Sign up instead
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
