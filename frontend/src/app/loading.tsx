import { Spinner } from "@/components/Spinner";

export default function Loading() {
  return (
    <main className="min-h-screen px-4 flex items-center justify-center">
      <div className="section-shell glass-surface max-w-md rounded-[2rem] border border-emerald-100/15 px-8 py-10 text-center">
        <span className="eyebrow mb-5">Loading State</span>
        <Spinner size="lg" className="mx-auto mb-4" />
        <p className="text-2xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
          Loading marketplace data
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Fetching listings, rarity data, and wallet-aware marketplace details.
        </p>
      </div>
    </main>
  );
}
