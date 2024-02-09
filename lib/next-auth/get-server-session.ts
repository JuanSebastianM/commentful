import { authOptions } from 'lib/next-auth/auth-options';

import { getServerSession as getNextAuthServerSession } from 'next-auth';

export const getServerSession = async () => {
  const session =
    await getNextAuthServerSession(authOptions);

  if (!session) return null;

  return session;
};
