export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div
        role="status"
        aria-label="Loading destination"
        className="h-10 w-10 animate-spin rounded-full bg-linear-to-r from-sky-400 via-green-500 to-red-500 p-0.75"
      >
        <div className="h-full w-full rounded-full bg-white" />
      </div>
    </main>
  );
}
