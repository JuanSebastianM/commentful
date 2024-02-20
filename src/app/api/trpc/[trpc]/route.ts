import { createTrpcContext } from 'lib/trpc/server/context';
import { appRouter } from 'lib/trpc/server/router';

import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async () => await createTrpcContext(),
  });
};

export { handler as GET, handler as POST };
