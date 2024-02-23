export default async function UnauthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-300">
      {children}
    </main>
  );
}
