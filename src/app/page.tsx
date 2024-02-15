import Link from 'next/link';

import { getServerSession } from 'lib/next-auth/get-server-session';

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="relative min-h-screen">
      <header className="py-4 px-8 flex justify-between items-center bg-primary sticky z-10 top-0 text-black">
        <h1>Commentful</h1>
        <nav>
          <ul className="flex justify-evenly items-center gap-8">
            <li>
              {session ? (
                <>
                  <p>Welcome, {session.user.name}!</p>
                  <p>Your email is: {session.user.email}</p>
                </>
              ) : (
                <Link href="#">Sign in</Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
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
