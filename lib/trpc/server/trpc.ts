import type { TrpcContext } from 'lib/trpc/server/context';

import { TRPCError, initTRPC } from '@trpc/server';
import SuperJSON from 'superjson';

const t = initTRPC.context<TrpcContext>().create({
  transformer: SuperJSON,
});

const authenticatedMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action.',
    });
  }

  return await next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});

// Router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
export const authenticatedProcedure = t.procedure.use(authenticatedMiddleware);
