import { ErrorCodes } from 'lib/errors/draft';
import { prisma } from 'lib/prisma';

export const createDraft = async (email: string) => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    throw new Error(ErrorCodes.NO_USER_FOUND);
  }

  const draft = await prisma.draft.create({
    data: {
      author: { connect: { email: user.email } },
      title: '',
      contributorsEmails: [],
      content: { create: { html: '', markdown: '' } },
    },
  });

  return draft;
};
