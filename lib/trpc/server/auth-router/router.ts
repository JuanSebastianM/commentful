import { ERROR_MESSAGES, ErrorCodes } from 'lib/errors/next-auth';
import { createUser } from 'lib/server-only/user/create-user';
import { ZSignUpMutationSchema } from 'lib/trpc/server/auth-router/schema';

import { TRPCError } from '@trpc/server';

import { procedure, router } from '../trpc';

export const authRouter = router({
  signup: procedure.input(ZSignUpMutationSchema).mutation(async ({ input }) => {
    try {
      const { name, email, password } = input;

      const user = await createUser({
        name,
        email: email.toLowerCase(),
        password,
      });

      return user;
    } catch (error) {
      let message = ERROR_MESSAGES[ErrorCodes.FAILED_ACCOUNT_CREATION];

      if (error instanceof Error && error.message === ErrorCodes.USER_EXISTS) {
        message = ERROR_MESSAGES[ErrorCodes.USER_EXISTS];
      }

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message,
      });
    }
  }),
});
