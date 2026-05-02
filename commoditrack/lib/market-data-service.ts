// lib/market-data-service.ts

import yahooFinance from 'yahoo-finance2';
import { YahooQuote, CommodityData } from './types/market';

/**
 * Yahoo Finance v2 uyarısını susturmak için kütüphanenin kendi metodunu kullanıyoruz.
 * Bu sayede "new" anahtar kelimesine gerek kalmadan direkt kullanım sağlanır.
 */
// @ts-expect-error - Kütüphanenin tip tanımları suppressNotices metodunu içermeyebilir
yahooFinance.suppressNotices(['yahooFinance.quote()']);

export async function getCommodityData(symbol: string): Promise<CommodityData> {
  try {
    if (!symbol) throw new Error("Sembol belirtilmedi.");

    const cleanSymbol = symbol.toUpperCase();
    console.log(`[CommodiTrack] Fetching: ${cleanSymbol}`);
    
    // Doğrudan varsayılan export üzerinden çağırıyoruz
    const quote = await yahooFinance.quote(cleanSymbol) as YahooQuote;

    if (quote && typeof quote.regularMarketPrice !== 'undefined') {
      return {
        source: 'Yahoo Finance',
        price: quote.regularMarketPrice,
        change: quote.regularMarketChangePercent || 0,
        name: quote.shortName || quote.longName || cleanSymbol,
        currency: quote.currency || 'USD'
      };
    }

    throw new Error('Yahoo Finance eksik veri döndürdü.');
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Bilinmeyen hata";
    console.error(`[Service Error] ${symbol}:`, errorMsg);
    throw new Error(errorMsg);
  }
}