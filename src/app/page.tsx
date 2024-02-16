import Link from 'next/link';

import { getServerSession } from 'lib/next-auth/get-server-session';

import Header from '~/components/layout/header';

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="relative min-h-screen">
      <Header user={session ? session.user : null} />
      <main className="px-8 py-12">
        <section className="flex flex-col items-center gap-8">
          <h2>Your Drafts</h2>
          <ul className="my-8">
            <li>
              <Link href="#">My first draft</Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
