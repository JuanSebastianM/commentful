import { prisma } from 'lib/prisma/index';

import { PrismaAdapter } from '@auth/prisma-adapter';
import type { NextAuthOptions, User } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'youremail@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: (credentials) => {
        if (!credentials) {
          throw new Error('Credentials not provided');
        }

        console.log({ authorizeCredentials: credentials });

        // TODO: mock data - correct data comes from Prisma
        return {
          id: '1',
          name: credentials.name,
          email: credentials.email,
        } satisfies User;
      },
    }),
  ],
};
