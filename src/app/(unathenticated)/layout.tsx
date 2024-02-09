export default async function UnauthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-300 flex justify-center items-center flex-col min-h-screen">
      {children}
    </main>
  );
}
