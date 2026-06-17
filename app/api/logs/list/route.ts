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

    return NextResponse.json(logs || []);
  } catch (error: any) {
    console.error('Fetch logs error (Backend):', error);

    let errorMessage = 'خطا در دریافت لاگ‌ها از دیتابیس';
    if (error.code === 'P1001') {
      errorMessage = 'عدم اتصال به دیتابیس. لطفا وضعیت سرور PostgreSQL را بررسی کنید.';
    }

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: 500 }
    );
  }
}
