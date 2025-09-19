import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-8", className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" rx="20" fill="currentColor" />
      <text
        x="50"
        y="50"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="50"
        fontWeight="bold"
        fill="hsl(var(--primary-foreground))"
        textAnchor="middle"
        dominantBaseline="central"
      >
        AE
      </text>
    </svg>
  );
}
