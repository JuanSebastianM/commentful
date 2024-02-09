'use client';

import type { ReactNode } from 'react';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface NextAuthProviderProps {
  session: Session | null;
  children: ReactNode;
}

export const NextAuthProvider = ({
  session,
  children,
}: NextAuthProviderProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};
