'use client';

import Link from 'next/link';

import { trpc } from 'lib/trpc/react';

export const DraftsList = () => {
  const drafts = trpc.draft.getAllByUserEmail.useQuery();

  // TODO: add skeleton
  return (
    <>
      <h2>Your Drafts</h2>
      <ul className="my-8 flex flex-col gap-4">
        {drafts?.data?.length
          ? drafts.data.map((draft) => (
              <li key={draft.id}>
                <p>
                  blog id:{' '}
                  <Link href={`/draft/${draft.id}`}>
                    {draft.id}
                  </Link>
                </p>
                <p>blog title: {draft.title}</p>
              </li>
            ))
          : null}
      </ul>
    </>
  );
};
