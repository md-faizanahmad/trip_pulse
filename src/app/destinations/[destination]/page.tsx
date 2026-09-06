type DestinationPageProps = {
  params: Promise<{
    destination: string;
  }>;
};

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { destination } = await params;

  const name = decodeURIComponent(destination);

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          {name}
        </h1>
      </div>
    </main>
  );
}
