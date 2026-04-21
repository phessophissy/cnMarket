import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const textSizes = { sm: "text-lg", md: "text-xl", lg: "text-2xl" };

export function Logo({ size = "md" }: LogoProps) {
  return (
    <Link href="/" className={`text-white font-semibold ${textSizes[size]} flex items-center gap-2`} style={{ fontFamily: "var(--font-heading)" }}>
      <span className="text-emerald-200">🎨</span>
      <span>cn<span className="text-gradient">Market</span></span>
    </Link>
  );
}
