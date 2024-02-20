import { AUTH_OPTIONS } from 'lib/next-auth/auth-options';

import NextAuth from 'next-auth';

const handler = NextAuth(AUTH_OPTIONS);

export { handler as GET, handler as POST };
