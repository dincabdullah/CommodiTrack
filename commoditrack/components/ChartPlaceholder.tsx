import { BarChart3 } from "lucide-react";
import type { Etf } from "@/lib/etf-data";

export function ChartPlaceholder({ etf }: { etf: Etf }) {
  const intervals = ["1D", "5D", "1M", "3M", "6M", "1Y", "ALL"];
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card shadow-elevated">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="font-mono text-lg font-bold tracking-tight">
            {etf.symbol}
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              {etf.name}
            </span>
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {etf.category} · NYSE Arca
          </p>
        </div>
        <div className="flex gap-1 rounded-lg border border-border bg-surface-elevated p-1">
          {intervals.map((i) => (
            <button
              key={i}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                i === "1M"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex min-h-[420px] flex-1 items-center justify-center overflow-hidden p-6">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Decorative line chart */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.17 200)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="oklch(0.72 0.17 200)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,280 L80,260 L160,290 L240,210 L320,230 L400,170 L480,200 L560,140 L640,160 L720,110 L800,130 L800,400 L0,400 Z"
            fill="url(#g)"
          />
          <path
            d="M0,280 L80,260 L160,290 L240,210 L320,230 L400,170 L480,200 L560,140 L640,160 L720,110 L800,130"
            fill="none"
            stroke="oklch(0.72 0.17 200)"
            strokeWidth="2.5"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-elevated/80 backdrop-blur">
            <BarChart3 className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">TradingView Chart</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Embed widget here · {etf.symbol}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
