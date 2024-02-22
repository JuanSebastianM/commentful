import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth';

import SignUpForm from '~/components/forms/sign-up';

const SignUpPage = async () => {
  const session = await getServerSession();

  if (session?.user) {
    // TODO: invoke toaster saying sth like 'to access this page, please sign out from this account first'.
    redirect('/');
  }

  return (
    <div>
      <h1>Create a new account</h1>

      <SignUpForm />

      <p>
        Already have an account?{' '}
        <Link href="/signin" className="text-primary hover:opacity-80">
          Sign in instead
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
