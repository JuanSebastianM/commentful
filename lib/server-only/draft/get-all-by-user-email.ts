import { ErrorCodes } from 'lib/errors/draft';
import { prisma } from 'lib/prisma';

export const getAllByUserEmail = async (email: string) => {
  const user = await prisma.user.findFirst({ where: { email }, select: { ownDrafts: true } });

  if (!user) {
    throw new Error(ErrorCodes.NO_USER_FOUND);
  }

  return user.ownDrafts;
};
