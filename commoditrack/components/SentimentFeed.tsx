import { Sparkles } from "lucide-react";
import type { SentimentItem, Sentiment } from "@/lib/etf-data";

const STYLES: Record<Sentiment, string> = {
  Bullish: "bg-bullish/15 text-bullish border-bullish/30",
  Bearish: "bg-bearish/15 text-bearish border-bearish/30",
  Neutral: "bg-neutral/15 text-neutral border-neutral/30",
};

export function SentimentFeed({ items }: { items: SentimentItem[] }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card shadow-elevated">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Market Sentiment</h3>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              AI · Powered Analysis
            </p>
          </div>
        </div>
      </div>

      <ul className="flex-1 divide-y divide-border overflow-y-auto">
        {items.map((item) => (
          <li key={item.id} className="px-5 py-4 transition-colors hover:bg-surface-elevated">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STYLES[item.sentiment]}`}
              >
                {item.sentiment}
              </span>
              <span className="text-[10px] text-muted-foreground">{item.time}</span>
            </div>
            <p className="mt-2.5 text-sm leading-snug">{item.headline}</p>
            <p className="mt-1.5 text-[11px] text-muted-foreground">— {item.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
