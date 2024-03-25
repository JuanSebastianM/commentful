import { ErrorCodes } from 'lib/errors/draft';
import { prisma } from 'lib/prisma';

interface CreatedDraftInfo {
  id: string;
  title: string;
  createdAt: Date;
}

const DEFAULT_DRAFT_TITLE = 'Untitled';

export const createDraft = async (
  email: string,
): Promise<CreatedDraftInfo> => {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw new Error(ErrorCodes.NO_USER_FOUND);
  }

  const createdDraft = await prisma.draft.create({
    data: {
      author: { connect: { email: user.email } },
      title: DEFAULT_DRAFT_TITLE,
      contributorsEmails: [],
      content: { create: { html: '', markdown: '' } },
    },
  });

  const data = {
    id: createdDraft.id,
    title: createdDraft.title,
    createdAt: createdDraft.createdAt,
  };

  return data;
};
