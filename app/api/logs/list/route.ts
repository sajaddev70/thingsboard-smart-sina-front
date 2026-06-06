import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const logs = await prisma.apiLog.findMany({
      take: limit,
      orderBy: { timestamp: 'desc' },
    });

    return NextResponse.json(logs);
  } catch (error: any) {
    console.error('Fetch logs error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch logs' }, { status: 500 });
  }
}
