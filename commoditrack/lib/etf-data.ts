export type Sentiment = "Bullish" | "Bearish" | "Neutral";

export type Category = "Energy" | "Agriculture" | "Precious Metals";

export const CATEGORIES: { name: Category; slug: string; description: string; items: string }[] = [
  {
    name: "Energy",
    slug: "energy",
    description: "Crude oil, natural gas & integrated energy ETFs",
    items: "Oil · Gas · Energy Sector",
  },
  {
    name: "Agriculture",
    slug: "agriculture",
    description: "Soft commodities and farm-staple futures",
    items: "Corn · Wheat · Soybeans",
  },
  {
    name: "Precious Metals",
    slug: "precious-metals",
    description: "Safe-haven and industrial metal trusts",
    items: "Gold · Silver · Platinum",
  },
];

export function categoryFromSlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)?.name;
}

export function slugFromCategory(name: Category): string {
  return CATEGORIES.find((c) => c.name === name)!.slug;
}

export type Etf = {
  symbol: string;
  name: string;
  category: Category;
  price: number;
  change: number;
  changePct: number;
};

export const ETFS: Etf[] = [
  // Energy
  { symbol: "USO", name: "US Oil Fund", category: "Energy", price: 78.42, change: 1.24, changePct: 1.6 },
  { symbol: "UNG", name: "US Natural Gas", category: "Energy", price: 14.08, change: -0.32, changePct: -2.22 },
  { symbol: "XLE", name: "Energy Select SPDR", category: "Energy", price: 92.17, change: 0.88, changePct: 0.96 },
  // Agriculture
  { symbol: "DBA", name: "Agriculture Fund", category: "Agriculture", price: 25.31, change: 0.14, changePct: 0.56 },
  { symbol: "CORN", name: "Teucrium Corn", category: "Agriculture", price: 21.66, change: -0.09, changePct: -0.41 },
  { symbol: "WEAT", name: "Teucrium Wheat", category: "Agriculture", price: 5.42, change: 0.06, changePct: 1.12 },
  // Precious Metals
  { symbol: "GLD", name: "SPDR Gold Shares", category: "Precious Metals", price: 218.94, change: 2.41, changePct: 1.11 },
  { symbol: "SLV", name: "iShares Silver", category: "Precious Metals", price: 27.83, change: 0.62, changePct: 2.28 },
  { symbol: "PPLT", name: "Platinum Trust", category: "Precious Metals", price: 91.05, change: -0.44, changePct: -0.48 },
];

export type SentimentItem = {
  id: string;
  sentiment: Sentiment;
  headline: string;
  source: string;
  time: string;
};

export const SENTIMENT_BY_SYMBOL: Record<string, SentimentItem[]> = {
  USO: [
    { id: "1", sentiment: "Bullish", headline: "OPEC+ signals deeper output cuts into Q3, tightening global supply.", source: "Reuters", time: "12m ago" },
    { id: "2", sentiment: "Neutral", headline: "US crude inventories near five-year average; demand holding steady.", source: "EIA", time: "1h ago" },
    { id: "3", sentiment: "Bearish", headline: "China refinery throughput slips on weaker industrial activity.", source: "Bloomberg", time: "3h ago" },
  ],
  GLD: [
    { id: "1", sentiment: "Bullish", headline: "Central banks add 31t of gold in latest WGC report; demand robust.", source: "WGC", time: "8m ago" },
    { id: "2", sentiment: "Bullish", headline: "Softer US CPI print boosts rate-cut bets, lifting bullion.", source: "FT", time: "45m ago" },
    { id: "3", sentiment: "Neutral", headline: "ETF flows mixed as traders await Fed minutes.", source: "Kitco", time: "2h ago" },
  ],
};

const DEFAULT_FEED: SentimentItem[] = [
  { id: "d1", sentiment: "Bullish", headline: "Analyst upgrades sector outlook citing tightening supply fundamentals.", source: "MarketWatch", time: "20m ago" },
  { id: "d2", sentiment: "Neutral", headline: "Inventories in line with seasonal averages; volatility compressed.", source: "Reuters", time: "1h ago" },
  { id: "d3", sentiment: "Bearish", headline: "Stronger USD weighs on commodity-linked ETFs in early trade.", source: "Bloomberg", time: "2h ago" },
  { id: "d4", sentiment: "Bullish", headline: "Speculative net longs rise for a third consecutive week.", source: "CFTC", time: "5h ago" },
];

export function getSentimentFor(symbol: string): SentimentItem[] {
  return SENTIMENT_BY_SYMBOL[symbol] ?? DEFAULT_FEED;
}
