import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { Etf } from "@/lib/etf-data";

export function PriceCard({ etf }: { etf: Etf }) {
  const up = etf.change >= 0;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-surface p-6 shadow-elevated">
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-primary opacity-15 blur-3xl" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Real-Time Price
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {etf.symbol} · {etf.name}
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-surface-elevated px-2.5 py-1 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-bullish animate-pulse-dot" />
          LIVE
        </div>
      </div>

      <div className="mt-5 flex items-end gap-3">
        <span className="font-mono text-5xl font-bold tracking-tight tabular-nums">
          ${etf.price.toFixed(2)}
        </span>
        <div
          className={`mb-1.5 flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold ${
            up ? "bg-bullish/15 text-bullish" : "bg-bearish/15 text-bearish"
          }`}
        >
          {up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          {up ? "+" : ""}
          {etf.change.toFixed(2)} ({up ? "+" : ""}
          {etf.changePct.toFixed(2)}%)
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-4 text-xs">
        <Stat label="Open" value={`$${(etf.price - etf.change).toFixed(2)}`} />
        <Stat label="Day High" value={`$${(etf.price + Math.abs(etf.change) * 1.4).toFixed(2)}`} />
        <Stat label="Day Low" value={`$${(etf.price - Math.abs(etf.change) * 1.6).toFixed(2)}`} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="font-mono text-sm tabular-nums">{value}</span>
    </div>
  );
}
