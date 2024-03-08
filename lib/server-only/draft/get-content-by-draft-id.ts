import { ErrorCodes } from 'lib/errors/draft';
import { prisma } from 'lib/prisma';

interface GetContentByDraftIdProps {
  userEmail: string;
  draftId: string;
}

export const getContentByDraftId = async ({ userEmail, draftId }: GetContentByDraftIdProps) => {
  const draftContent = await prisma.content.findFirst({
    where: { draftId },
    include: { draft: true },
  });

  if (!draftContent) {
    throw new Error(ErrorCodes.NO_DRAFT_FOUND);
  }

  if (
    ![draftContent.draft.authorEmail, ...draftContent.draft.contributorsEmails].includes(userEmail)
  ) {
    throw new Error(ErrorCodes.UNAUTHORIZED_USER);
  }

  return { html: draftContent.html, markdown: draftContent.markdown };
};
