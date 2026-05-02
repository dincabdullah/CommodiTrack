"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CommodiSidebar } from "@/components/CommodiSidebar";
import { FavoriteButton } from "@/components/FavoriteButton";
import { CATEGORIES, ETFS } from "@/lib/etf-data";
import { useFavorites } from "@/hooks/use-favorites";
import { Bell, Search, Flame, Wheat, Gem, ArrowUpRight, Heart } from "lucide-react";

const ICONS = {
  Energy: Flame,
  Agriculture: Wheat,
  "Precious Metals": Gem,
} as const;

const ACCENTS = {
  Energy: "text-orange-400",
  Agriculture: "text-lime-400",
  "Precious Metals": "text-amber-300",
} as const;

export default function Overview() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { favorites } = useFavorites();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <SidebarProvider>
      <div className="dark flex min-h-screen w-full bg-background text-foreground">
        <CommodiSidebar />

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-3">
              <Link
                href="/favorites"
                className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <Heart className="h-3.5 w-3.5" />
                Favorites
                {favorites.length > 0 && (
                  <span className="rounded-full bg-bearish/15 px-1.5 text-[10px] font-semibold text-bearish">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
                <Bell className="h-4 w-4" />
              </button>
            </div>
          </header>

          <main className="flex-1 px-4 py-8 md:px-8 md:py-12">
            <h1 className="sr-only">CommodiTrack Overview</h1>

            <section className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
                Commodity ETF Terminal
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
                What are you tracking today?
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                Search any symbol or pick a sector to dive in.
              </p>

              <form
                onSubmit={onSubmit}
                className="mx-auto mt-6 flex max-w-xl items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-elevated focus-within:border-primary"
              >
                <Search className="ml-2 h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search symbol or name (e.g. GLD, oil, wheat)…"
                  className="flex-1 bg-transparent px-1 py-2 text-sm placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
                >
                  Search
                </button>
              </form>
            </section>

            <section className="mx-auto mt-12 max-w-6xl">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Browse Categories</h3>
                  <p className="text-xs text-muted-foreground">
                    Pick a sector to see all listed ETFs.
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {ETFS.length} instruments
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {CATEGORIES.map((cat) => {
                  const Icon = ICONS[cat.name as keyof typeof ICONS];
                  const accent = ACCENTS[cat.name as keyof typeof ACCENTS];
                  const count = ETFS.filter((e) => e.category === cat.name).length;
                  return (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-surface p-6 shadow-elevated transition-all hover:border-primary/40 hover:shadow-glow"
                    >
                      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-primary opacity-10 blur-3xl transition-opacity group-hover:opacity-25" />
                      <div className="relative flex items-start justify-between">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated ${accent}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                      <h4 className="relative mt-5 text-xl font-bold tracking-tight">
                        {cat.name}
                      </h4>
                      <p className="relative mt-1 text-sm text-muted-foreground">
                        {cat.description}
                      </p>
                      <div className="relative mt-5 flex items-center justify-between border-t border-border pt-3">
                        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                          {cat.items}
                        </span>
                        <span className="font-mono text-xs text-foreground">
                          {count} ETFs
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="mx-auto mt-12 max-w-6xl">
              <h3 className="mb-4 text-lg font-semibold">Trending</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {ETFS.slice(0, 6).map((etf) => {
                  const up = etf.changePct >= 0;
                  return (
                    <Link
                      key={etf.symbol}
                      href={`/symbol/${etf.symbol}`}
                      className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-2 w-2 rounded-full ${up ? "bg-bullish" : "bg-bearish"}`} />
                        <div>
                          <div className="font-mono text-sm font-semibold">{etf.symbol}</div>
                          <div className="text-[11px] text-muted-foreground">{etf.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs ${up ? "text-bullish" : "text-bearish"}`}>
                          {up ? "+" : ""}{etf.changePct.toFixed(2)}%
                        </span>
                        <FavoriteButton symbol={etf.symbol} size="sm" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}