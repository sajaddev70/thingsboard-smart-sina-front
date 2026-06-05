import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await prisma.apiLog.create({
      data: {
        correlationId: data.correlationId,
        method: data.method,
        endpoint: data.endpoint,
        fullUrl: data.fullUrl,
        headers: data.headers || {},
        params: data.params || {},
        requestBody: data.requestBody || {},
        responseBody: data.responseBody || {},
        status: data.status,
        duration: data.duration,
        curl: data.curl,
        errorMessage: data.errorMessage,
        errorDetails: data.errorDetails,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log API call:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
