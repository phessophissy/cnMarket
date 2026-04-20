import { Spinner } from "@/components/Spinner";

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-400">Loading...</p>
      </div>
    </main>
  );
}
