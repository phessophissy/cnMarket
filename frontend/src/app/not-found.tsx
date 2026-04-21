import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center glass-surface rounded-3xl p-8 md:p-10 border border-emerald-100/15 max-w-lg w-full">
        <h1 className="text-6xl font-semibold text-emerald-100/70 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          404
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
        <p className="text-slate-300 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-emerald-300 to-teal-300 hover:brightness-105 text-[#063b36] px-6 py-3 rounded-lg font-semibold transition"
        >
          Back to Marketplace
        </Link>
      </div>
    </main>
  );
}
