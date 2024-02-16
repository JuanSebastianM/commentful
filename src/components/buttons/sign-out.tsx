'use client';

import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  return (
    <button type="button" onClick={() => signOut({ callbackUrl: '/' })}>
      Sign out
    </button>
  );
};

export default SignOutButton;
