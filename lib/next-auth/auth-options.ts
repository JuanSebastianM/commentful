import { ErrorCodes } from 'lib/errors/next-auth';
import { prisma } from 'lib/prisma';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt';
import type { NextAuthOptions, Session, User } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';

export const AUTH_OPTIONS: NextAuthOptions = {
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error(ErrorCodes.CREDENTIALS_NOT_FOUND);
        }

        console.log({ authorizeCredentials: credentials });

        try {
          const user = await prisma.user.findFirstOrThrow({
            where: {
              email: credentials.email.toLowerCase(),
            },
          });

          if (!user.password) {
            throw new Error(ErrorCodes.NO_PASSWORD_ACCOUNT);
          }

          const samePassword = await compare(credentials.password, user.password);

          if (!samePassword) {
            throw new Error(ErrorCodes.INVALID_CREDENTIALS);
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified?.toISOString() ?? null,
          } satisfies User;
        } catch {
          throw new Error(ErrorCodes.INVALID_CREDENTIALS);
        }
      },
    }),
  ],
  callbacks: {
    session({ token, session }) {
      if (token && token.email) {
        return {
          ...session,
          user: {
            id: token.id ?? token.sub,
            name: token.name,
            email: token.email,
            emailVerified: token.emailVerified ?? null,
          },
        } satisfies Session;
      }

      return session;
    },
  },
};
