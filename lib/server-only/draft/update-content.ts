import { ErrorCodes } from 'lib/errors/draft';
import { prisma } from 'lib/prisma';

interface UpdateContentProps {
  userEmail: string;
  draftId: string;
  html: string;
  markdown: string;
}

export const updateContent = async ({ userEmail, draftId, html, markdown }: UpdateContentProps) => {
  const draft = await prisma.draft.findFirst({ where: { id: draftId } });

  if (!draft) {
    throw new Error(ErrorCodes.NO_DRAFT_FOUND);
  }

  if (![draft.authorEmail, ...draft.contributorsEmails].includes(userEmail)) {
    throw new Error(ErrorCodes.UNAUTHORIZED_USER);
  }

  const updatedContent = await prisma.content.update({
    where: { draftId },
    data: { html, markdown },
  });

  return updatedContent;
};
