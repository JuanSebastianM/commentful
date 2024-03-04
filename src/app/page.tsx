import { getServerSession } from 'next-auth';

import { CreateDraftButton } from '~/components/buttons/create-draft';
import { DraftsList } from '~/components/drafts-list';
import Header from '~/components/layout/header';

export default async function Home() {
  const session = await getServerSession();

  const isLoggedIn = !!session?.user;

  return (
    <div className="relative min-h-screen">
      <Header user={session ? session.user : null} />
      <main className="px-8 py-12">
        <section className="flex flex-col items-center gap-8">
          {isLoggedIn ? <CreateDraftButton>Create draft</CreateDraftButton> : null}
          {isLoggedIn ? <DraftsList /> : null}
        </section>
      </main>
    </div>
  );
}
