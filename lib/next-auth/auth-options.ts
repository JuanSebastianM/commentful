import { prisma } from 'lib/prisma';

import { PrismaAdapter } from '@auth/prisma-adapter';
import type {
  NextAuthOptions,
  Session,
  User,
} from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: {
          label: 'Name',
          type: 'name',
          placeholder: 'John Doe',
        },
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
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error('Credentials not provided');
        }

        console.log({ authorizeCredentials: credentials });

        try {
          const user = await prisma.user.findFirstOrThrow({
            where: {
              email: credentials.email.toLowerCase(),
            },
          });

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified:
              user.emailVerified?.toISOString() ?? null,
          } satisfies User;
        } catch {
          throw new Error(
            'The email or password provided is incorrect',
          );
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
