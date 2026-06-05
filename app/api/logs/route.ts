import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Detailed Console Logging for the Developer
    console.log('\n' + '='.repeat(80));
    console.log(`🌐 API CALL: ${data.method} ${data.endpoint}`);
    console.log(`📍 Full URL: ${data.fullUrl}`);
    console.log(`⏱️ Duration: ${data.duration}ms | 🔢 Status: ${data.status}`);
    console.log(`🔗 Correlation ID: ${data.correlationId}`);
    console.log('-'.repeat(40));
    console.log('📝 Request Headers:', JSON.stringify(data.headers, null, 2));
    if (data.params) console.log('🔍 Query Params:', JSON.stringify(data.params, null, 2));
    if (data.requestBody) console.log('📦 Request Body:', JSON.stringify(data.requestBody, null, 2));
    console.log('-'.repeat(40));
    console.log('✅ Response Body:', JSON.stringify(data.responseBody, null, 2));
    if (data.errorMessage) {
        console.log('❌ Error Message:', data.errorMessage);
        console.log('💾 Error Details:', JSON.stringify(data.errorDetails, null, 2));
    }
    console.log('-'.repeat(40));
    console.log('💻 cURL Command:');
    console.log('\x1b[36m%s\x1b[0m', data.curl); // Cyan color for cURL
    console.log('='.repeat(80) + '\n');

    // Database Persistence (Optional check for environment variable)
    if (process.env.DATABASE_URL) {
        try {
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
        } catch (dbError) {
            console.error('⚠️ DB Logging failed (skipping):', dbError instanceof Error ? dbError.message : 'Unknown error');
        }
    } else {
        console.log('ℹ️ DB Logging skipped: DATABASE_URL not found.');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('🔥 Logger Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
