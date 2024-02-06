import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative">
      <header className="py-4 px-8 flex justify-between items-center bg-lime-500 sticky z-10 top-0 text-black">
        <h1>Commentful</h1>
        <nav>
          <ul className="flex justify-evenly items-center gap-8">
            <li>
              <Link href="#">Sign in</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="px-8 py-12">
        <section className="flex min-h-screen flex-col items-center gap-8">
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
