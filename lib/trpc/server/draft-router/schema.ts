import { z } from 'zod';

export const ZUpdateContentMutationSchema = z.object({
  draftId: z.string(),
  html: z.string(),
  markdown: z.string(),
});

export const ZGetByDraftIdSchema =
  ZUpdateContentMutationSchema.pick({ draftId: true });
