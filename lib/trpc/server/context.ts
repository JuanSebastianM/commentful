import { getServerSession } from 'lib/next-auth/get-server-session';

export const createTrpcContext = async () => {
  const { session } = await getServerSession();

  return { session };
};

export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>;
