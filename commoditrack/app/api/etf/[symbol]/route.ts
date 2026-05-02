import { NextResponse } from 'next/server';
import { getCommodityData } from '@/lib/market-data-service';

// params artık bir Promise olduğu için tipini güncelliyoruz
export async function GET(
  request: Request, 
  { params }: { params: Promise<{ symbol: string }> } 
) {
  try {
    // BURASI KRİTİK: params'ı await etmelisin
    const { symbol } = await params;

    if (!symbol) {
      return NextResponse.json({ error: "Symbol missing" }, { status: 400 });
    }

    const basicData = await getCommodityData(symbol);
    
    // ... grafik verisi çekme işlemin ...
    
    return NextResponse.json({ ...basicData });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Veri çekilemedi" }, { status: 500 });
  }
}