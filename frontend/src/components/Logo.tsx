import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: {
    mark: "h-10 w-10",
    wrap: "gap-3",
    title: "text-lg",
    sub: "text-[0.58rem]",
  },
  md: {
    mark: "h-11 w-11",
    wrap: "gap-3",
    title: "text-xl",
    sub: "text-[0.62rem]",
  },
  lg: {
    mark: "h-14 w-14",
    wrap: "gap-4",
    title: "text-2xl",
    sub: "text-[0.7rem]",
  },
} as const;

/** Component update 40-3 */
export function Logo({ size = "md" }: LogoProps) {
  const styles = sizeMap[size];

  return (
    <Link
      href="/"
      className={`group inline-flex items-center ${styles.wrap}`}
      style={{ fontFamily: "var(--font-heading)" }}
    >
      <span
        className={`${styles.mark} relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-emerald-100/20 bg-[#071c22]/90 shadow-[0_12px_32px_rgba(0,0,0,0.24)]`}
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(180,255,216,0.38),transparent_36%),radial-gradient(circle_at_78%_18%,rgba(66,199,219,0.28),transparent_28%),linear-gradient(145deg,rgba(11,34,40,1),rgba(7,24,28,1))]" />
        <span className="absolute inset-[6px] rounded-[1rem] border border-white/6" />
        <span className="relative flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[linear-gradient(180deg,var(--mint-0),var(--mint-2))] shadow-[0_0_0_4px_rgba(103,240,191,0.12)]" />
          <span className="h-5 w-5 rounded-full border border-cyan-100/20 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.4),transparent_28%),linear-gradient(180deg,rgba(66,199,219,0.9),rgba(20,147,104,0.95))]" />
        </span>
      </span>
      <span className="flex flex-col">
        <span className={`${styles.title} font-semibold tracking-[-0.05em] text-white`}>
          cn<span className="text-gradient">Market</span>
        </span>
        <span className={`${styles.sub} uppercase tracking-[0.34em] text-slate-400 transition-colors group-hover:text-slate-300`}>
          Celo NFT Studio
        </span>
      </span>
    </Link>
  );
}
