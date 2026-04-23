import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const textSizes = { sm: "text-lg", md: "text-xl", lg: "text-2xl" };

/** Component update 24-1 */
export function Logo({ size = "md" }: LogoProps) {
  return (
    <Link href="/" className={`text-white font-bold ${textSizes[size]} flex items-center gap-2`}>
      <span className="text-green-400">🎨</span>
      <span>cn<span className="text-gradient">Market</span></span>
    </Link>
  );
}
