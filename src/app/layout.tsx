import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { TrpcProvider } from 'lib/trpc/react';
import { cn } from 'lib/utils/ui';

import { getServerSession } from 'next-auth';

import { Toaster } from '~/components/ui/toaster';
import { NextAuthProvider } from '~/providers/next-auth';

import './globals.css';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Commentful',
  description:
    'A platform where you can write articles in markdown format and invite friends to give feedback by highlighting specific sections.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <NextAuthProvider session={session}>
          <TrpcProvider>
            {children}
            <Toaster />
          </TrpcProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
