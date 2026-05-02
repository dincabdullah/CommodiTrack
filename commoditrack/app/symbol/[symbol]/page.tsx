"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CommodiSidebar } from "@/components/CommodiSidebar";
import { SymbolPageData } from "@/lib/types/market"; // Tipi içeri aktar
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export default function SymbolDetail() {
  const params = useParams();
  // Params'ın string olduğundan emin oluyoruz
  const symbol = Array.isArray(params.symbol) ? params.symbol[0] : params.symbol;
  
  // any yerine SymbolPageData | null kullanıyoruz
  const [data, setData] = useState<SymbolPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    fetch(`/api/etf/${symbol.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Veri çekilemedi");
        return res.json() as Promise<SymbolPageData>; // API'den dönen verinin tipini belirttik
      })
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [symbol]);

  if (loading) return <div className="p-10 text-white font-mono">Yükleniyor...</div>;
  if (error || !data) return <div className="p-10 text-bearish font-mono">Hata: {error || "Veri bulunamadı"}</div>;

  return (
    <SidebarProvider>
      <div className="dark flex min-h-screen w-full bg-background text-foreground">
        <CommodiSidebar />
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 items-center border-b border-border px-4">
            <SidebarTrigger />
            <span className="ml-4 font-mono text-sm uppercase tracking-wider">{symbol} ANALİZİ</span>
          </header>

          <main className="flex-1 p-6 md:p-10">
            {/* Üst Panel: Tip güvenliği sayesinde data.price gibi alanlar artık hata vermez */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-5xl font-bold tracking-tight">{data.name}</h1>
                <p className="mt-2 font-mono text-muted-foreground">{symbol} • {data.source}</p>
              </div>
              
              <div className="text-left md:text-right">
                <div className="font-mono text-5xl font-bold">${data.price.toFixed(2)}</div>
                <div className={`text-lg font-semibold ${data.change >= 0 ? "text-bullish" : "text-bearish"}`}>
                  {data.change >= 0 ? "+" : ""}{data.change.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Grafik Alanı */}
            <div className="h-[400px] w-full rounded-3xl border border-border bg-card p-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="date" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#22c55e" 
                    strokeWidth={3} 
                    fill="url(#colorPrice)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}