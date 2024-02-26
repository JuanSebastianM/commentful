import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth';

export default async function UnauthenticatedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (session?.user) {
    redirect('/');
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-300">
      {children}
    </main>
  );
}
