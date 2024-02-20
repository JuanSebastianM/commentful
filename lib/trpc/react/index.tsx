'use client';

import { ReactNode, useState } from 'react';

import { AppRouter } from 'lib/trpc/server/router';
import { getBaseUrl } from 'lib/utils/get-base-url';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import SuperJSON from 'superjson';

export const trpc = createTRPCReact<AppRouter>();

export const TrpcProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc`, transformer: SuperJSON })],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
