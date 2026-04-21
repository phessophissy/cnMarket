"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center glass-surface rounded-3xl p-8 md:p-10 border border-rose-200/15 max-w-lg w-full">
        <h1 className="text-4xl font-semibold text-rose-200 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Something went wrong
        </h1>
        <p className="text-slate-300 mb-8 max-w-md mx-auto">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="bg-gradient-to-r from-emerald-300 to-teal-300 hover:brightness-105 text-[#063b36] px-6 py-3 rounded-lg font-semibold transition"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
