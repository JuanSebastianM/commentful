import type { TrpcContext } from 'lib/trpc/server/context';

import { initTRPC } from '@trpc/server';
import SuperJSON from 'superjson';

const t = initTRPC.context<TrpcContext>().create({
  transformer: SuperJSON,
});

// Router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
