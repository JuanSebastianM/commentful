import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
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

        console.log(credentials);

        return {
          id: '1',
          email: 'email@example.com',
          name: 'Juan',
        } satisfies User;
      },
    }),
  ],
};
