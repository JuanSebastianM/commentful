import { SALT_ROUNDS } from 'lib/constants/next-auth';
import { ErrorCodes } from 'lib/errors/next-auth';
import { prisma } from 'lib/prisma';

import { User } from '@prisma/client';
import { hash } from 'bcrypt';

export interface CreateUserOptions {
  name: string;
  email: string;
  password: string;
}

type CreatedUserInfo = Omit<User, 'password'>;

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserOptions): Promise<CreatedUserInfo> => {
  const hashedPassword = await hash(password, SALT_ROUNDS);

  const userExists = await prisma.user.findFirst({
    where: { email },
  });

  if (userExists) {
    throw new Error(ErrorCodes.USER_EXISTS);
  }

  const { password: newUserPassword, ...rest } =
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

  return rest;
};
