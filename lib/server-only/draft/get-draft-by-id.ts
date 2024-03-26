import { ErrorCodes } from 'lib/errors/draft';
import { prisma } from 'lib/prisma';

import { Draft } from '@prisma/client';

interface GetDraftByIdProps {
  userEmail: string;
  draftId: string;
}

export const getDraftById = async ({
  userEmail,
  draftId,
}: GetDraftByIdProps): Promise<Draft> => {
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

  return draft;
};
