import { ERROR_MESSAGES, ErrorCodes } from 'lib/errors/draft';
import { createDraft } from 'lib/server-only/draft/create-draft';
import { getAllByUserEmail } from 'lib/server-only/draft/get-all-by-user-email';
import { authenticatedProcedure, router } from 'lib/trpc/server/trpc';

import { TRPCError } from '@trpc/server';

export const draftRouter = router({
  create: authenticatedProcedure.mutation(async ({ ctx }) => {
    try {
      const { email } = ctx.session.user;

      const draft = await createDraft(email ?? '');

      return draft;
    } catch (error) {
      let message = ERROR_MESSAGES[ErrorCodes.FAILED_DRAFT_CREATION];

      if (error instanceof Error && error.message === ErrorCodes.NO_USER_FOUND) {
        message = ERROR_MESSAGES[ErrorCodes.NO_USER_FOUND];
      }

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message,
      });
    }
  }),
  getAllByUserEmail: authenticatedProcedure.query(async ({ ctx }) => {
    try {
      const { email } = ctx.session.user;

      const drafts = await getAllByUserEmail(email ?? '');

      return drafts;
    } catch (error) {
      let message = ERROR_MESSAGES[ErrorCodes.FAILED_DRAFTS_RETRIEVAL];

      if (error instanceof Error && error.message === ErrorCodes.NO_USER_FOUND) {
        message = ERROR_MESSAGES[ErrorCodes.NO_USER_FOUND];
      }

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message,
      });
    }
  }),
});
