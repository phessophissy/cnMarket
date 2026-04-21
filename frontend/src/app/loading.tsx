import { Spinner } from "@/components/Spinner";

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center glass-surface rounded-2xl px-8 py-10 border border-emerald-100/15">
        <Spinner size="lg" className="mx-auto mb-4" />
        <p className="text-slate-300">Loading marketplace data...</p>
      </div>
    </main>
  );
}
