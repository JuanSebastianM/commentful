import { authRouter } from './auth-router/router';
import { draftRouter } from './draft-router/router';
import { router } from './trpc';

export const appRouter = router({
  auth: authRouter,
  draft: draftRouter,
});

export type AppRouter = typeof appRouter;
