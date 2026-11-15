import { NextResponse } from 'next/server';
import { getPublicWatches } from '@/lib/watches';

export const dynamic = 'force-dynamic';

export async function GET() {
  const watches = await getPublicWatches();
  return NextResponse.json({ ok: true, watches });
}
