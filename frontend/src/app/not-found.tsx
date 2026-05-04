import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="section-shell glass-surface max-w-xl w-full rounded-[2rem] border border-emerald-100/15 p-8 text-center md:p-10">
        <span className="eyebrow mb-5">Lost Route</span>
        <h1 className="mb-4 text-7xl font-semibold text-emerald-100/70" style={{ fontFamily: "var(--font-heading)" }}>
          404
        </h1>
        <h2 className="mb-3 text-3xl font-semibold text-white">Page Not Found</h2>
        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-slate-300 md:text-base">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="button-shine inline-block rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-6 py-3 font-semibold text-[#063b36] transition hover:brightness-105"
        >
          Back to Marketplace
        </Link>
      </div>
    </main>
  );
}
