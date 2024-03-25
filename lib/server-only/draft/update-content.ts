import { ErrorCodes } from 'lib/errors/draft';
import { prisma } from 'lib/prisma';

interface UpdateContentProps {
  userEmail: string;
  draftId: string;
  html: string;
  markdown: string;
}

type UpdatedContentInfo = Omit<
  UpdateContentProps,
  'userEmail'
>;

export const updateContent = async ({
  userEmail,
  draftId,
  html,
  markdown,
}: UpdateContentProps): Promise<UpdatedContentInfo> => {
  const draft = await prisma.draft.findFirst({
    where: { id: draftId },
  });

  if (!draft) {
    throw new Error(ErrorCodes.NO_DRAFT_FOUND);
  }

  if (
    ![
      draft.authorEmail,
      ...draft.contributorsEmails,
    ].includes(userEmail)
  ) {
    throw new Error(ErrorCodes.UNAUTHORIZED_USER);
  }

  const [updatedContent] = await prisma.$transaction([
    prisma.content.update({
      where: { draftId },
      data: { html, markdown },
    }),
    prisma.draft.update({
      where: { id: draftId },
      data: {
        updatedAt: new Date().toISOString(),
      },
    }),
  ]);

  return updatedContent;
};
