import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

type Props = {
  symbol: string;
  size?: "sm" | "md";
  className?: string;
};

export function FavoriteButton({ symbol, size = "md", className }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const liked = isFavorite(symbol);
  const dim = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <button
      type="button"
      aria-label={liked ? `Unlike ${symbol}` : `Like ${symbol}`}
      aria-pressed={liked}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(symbol);
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-border bg-surface-elevated/60 transition-colors",
        liked ? "text-bearish hover:text-bearish" : "text-muted-foreground hover:text-foreground",
        dim,
        className,
      )}
    >
      <Heart className={cn(icon, liked && "fill-current")} />
    </button>
  );
}
