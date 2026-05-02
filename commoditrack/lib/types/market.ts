// types/market.ts

export interface YahooQuote {
  symbol: string;
  regularMarketPrice?: number;
  regularMarketChangePercent?: number;
  shortName?: string;
  longName?: string;
  currency?: string;
}

export interface CommodityData {
  source: string;
  price: number;
  change: number;
  name: string;
  currency: string;
}

export interface HistoricalRow {
  date: Date;
  close: number;
  high?: number;
  low?: number;
  open?: number;
  volume?: number;
  adjClose?: number;
}

export interface ChartPoint {
  date: string;
  price: number;
}

export interface SymbolPageData extends CommodityData {
  chartData: ChartPoint[];
}