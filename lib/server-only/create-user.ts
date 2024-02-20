'use server';

import { SALT_ROUNDS } from 'lib/constants/next-auth';
import { ErrorCodes } from 'lib/errors/next-auth';
import { prisma } from 'lib/prisma';

import { hash } from 'bcrypt';

export interface CreateUserOptions {
  name: string;
  email: string;
  password: string;
}

export const createUser = async ({ name, email, password }: CreateUserOptions) => {
  const hashedPassword = await hash(password, SALT_ROUNDS);

  const userExists = await prisma.user.findFirst({ where: { email } });

  if (userExists) {
    throw new Error(ErrorCodes.USER_EXISTS);
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
};
