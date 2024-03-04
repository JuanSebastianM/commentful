import { hashSync } from 'bcrypt';

import { prisma } from '.';
import { SALT_ROUNDS } from '../constants/next-auth';

const EXAMPLE_USER_EMAIL = 'examplecommentfuluser@mailinator.com';

const seedDatabase = async () => {
  const exampleUser = await prisma.user.upsert({
    where: {
      email: EXAMPLE_USER_EMAIL,
    },
    create: {
      name: 'Example User',
      email: EXAMPLE_USER_EMAIL,
      password: hashSync('password', SALT_ROUNDS),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    update: {},
  });

  const exampleDraft = await prisma.draft.create({
    data: {
      title: 'Example Draft',
      authorEmail: exampleUser.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.content.create({
    data: {
      draftId: exampleDraft.id,
      html: '<h2>Example Draft</h2><p>This is a paragraph</p>',
      markdown: '## Example Draft\\nThis is a paragraph\\n',
    },
  });
};

seedDatabase()
  .then(() => {
    console.log('Database seeding has been successful');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
