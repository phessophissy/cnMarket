interface AvatarProps {
  address: string;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-12 h-12" };

/** Component update 9-10 */
export function Avatar({ address, size = "md" }: AvatarProps) {
  const hue = parseInt(address.slice(2, 8), 16) % 360;

  return (
    <div
      className={`${sizes[size]} rounded-full flex-shrink-0`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${(hue + 60) % 360}, 70%, 40%))`,
      }}
    />
  );
}
