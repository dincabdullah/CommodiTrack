"use client";

import { Flame, Wheat, Gem, TrendingUp, Home, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { CATEGORIES } from "@/lib/etf-data";
import { useFavorites } from "@/hooks/use-favorites";

const CATEGORY_META: Record<string, { icon: typeof Flame; accent: string; slug: string }> = {
  Energy: { icon: Flame, accent: "text-orange-400", slug: "energy" },
  Agriculture: { icon: Wheat, accent: "text-lime-400", slug: "agriculture" },
  "Precious Metals": { icon: Gem, accent: "text-amber-300", slug: "precious-metals" },
};

export function CommodiSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();
  const { favorites } = useFavorites();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold tracking-tight">CommodiTrack</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                ETF Terminal
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-1 px-1 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {!collapsed && "Navigate"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Overview">
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    {!collapsed && <span>Overview</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/favorites"} tooltip="Favorites">
                  <Link href="/favorites">
                    <Heart className="h-4 w-4" />
                    {!collapsed && (
                      <span className="flex flex-1 items-center justify-between">
                        Favorites
                        {favorites.length > 0 && (
                          <span className="rounded-full bg-bearish/15 px-1.5 py-0.5 text-[10px] font-semibold text-bearish">
                            {favorites.length}
                          </span>
                        )}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {!collapsed && "Categories"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {CATEGORIES.map((cat) => {
                const meta = CATEGORY_META[cat.name];
                if (!meta) return null;
                const Icon = meta.icon;
                const accent = meta.accent;
                const active = pathname === `/category/${cat.slug}`;
                
                return (
                  <SidebarMenuItem key={cat.slug}>
                    <SidebarMenuButton asChild isActive={active} tooltip={cat.name}>
                      <Link href={`/category/${cat.slug}`}>
                        <Icon className={`h-4 w-4 ${accent}`} />
                        {!collapsed && <span>{cat.name}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}