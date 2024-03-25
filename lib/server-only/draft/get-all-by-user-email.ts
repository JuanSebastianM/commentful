import { ErrorCodes } from 'lib/errors/draft';
import { prisma } from 'lib/prisma';

interface UserOwnDraftInfo {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllByUserEmail = async (
  email: string,
): Promise<UserOwnDraftInfo[]> => {
  const user = await prisma.user.findFirst({
    where: { email },
    select: { ownDrafts: true },
  });

  if (!user) {
    throw new Error(ErrorCodes.NO_USER_FOUND);
  }

  const mappedOwnDrafts: UserOwnDraftInfo[] =
    user.ownDrafts.map(
      ({ id, createdAt, updatedAt, title }) => {
        return { id, title, createdAt, updatedAt };
      },
    );

  return mappedOwnDrafts;
};
