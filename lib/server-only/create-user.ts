'use server';

import { prisma } from 'lib/prisma';

export interface CreateUserOptions {
  name: string;
  email: string;
  password: string;
}

export const createUser = async ({
  name,
  email,
  password,
}: CreateUserOptions) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return user;
};
