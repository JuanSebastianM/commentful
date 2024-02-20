import { AUTH_OPTIONS } from 'lib/next-auth/auth-options';
import { prisma } from 'lib/prisma';

import { getServerSession as getNextAuthServerSession } from 'next-auth';

export const getServerSession = async () => {
  const session = await getNextAuthServerSession(AUTH_OPTIONS);

  if (!session || !session.user.email) {
    return { user: null, session: null };
  }

  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: session.user.email,
    },
  });

  return { session, user };
};
