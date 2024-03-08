import { ERROR_MESSAGES, ErrorCodes, isDraftErrorCode } from 'lib/errors/draft';
import type { ControlledDraftErrorCode } from 'lib/errors/draft';
import { createDraft } from 'lib/server-only/draft/create-draft';
import { getAllByUserEmail } from 'lib/server-only/draft/get-all-by-user-email';
import { getContentByDraftId } from 'lib/server-only/draft/get-content-by-draft-id';
import { updateContent } from 'lib/server-only/draft/update-content';
import {
  ZGetContentByDraftIdSchema,
  ZUpdateContentMutationSchema,
} from 'lib/trpc/server/draft-router/schema';
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
      let message = ERROR_MESSAGES[ErrorCodes.FAILED_ALL_DRAFTS_RETRIEVAL];

      if (error instanceof Error && error.message in ErrorCodes) {
        message = ERROR_MESSAGES[error.message as keyof typeof ErrorCodes];
      }

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message,
      });
    }
  }),
  getContentByDraftId: authenticatedProcedure
    .input(ZGetContentByDraftIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        const { draftId } = input;
        const { email } = ctx.session.user;

        const draftContent = await getContentByDraftId({ userEmail: email ?? '', draftId });

        return draftContent;
      } catch (error) {
        let message = ERROR_MESSAGES[ErrorCodes.FAILED_DRAFT_CONTENT_RETRIEVAL];

        if (isDraftErrorCode<ControlledDraftErrorCode>(error)) {
          message = ERROR_MESSAGES[error.message];
        }

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message,
        });
      }
    }),
  updateContent: authenticatedProcedure
    .input(ZUpdateContentMutationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { draftId, html, markdown } = input;
        const { email } = ctx.session.user;

        const updatedContent = await updateContent({
          userEmail: email ?? '',
          draftId,
          html,
          markdown,
        });

        return updatedContent;
      } catch (error) {
        let message = ERROR_MESSAGES.FAILED_DRAFT_CONTENT_UPDATE;

        if (isDraftErrorCode<ControlledDraftErrorCode>(error)) {
          message = ERROR_MESSAGES[error.message];
        }

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message,
        });
      }
    }),
});
