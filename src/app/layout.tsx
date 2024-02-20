import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { TrpcProvider } from 'lib/trpc/react';

import { getServerSession } from 'next-auth';

import { NextAuthProvider } from '~/providers/next-auth';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <TrpcProvider>{children}</TrpcProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
