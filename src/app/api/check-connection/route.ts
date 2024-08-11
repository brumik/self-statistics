import { NextResponse } from 'next/server';
import { connectMongoose } from '@/lib/mongoose';
import mongoose from 'mongoose';

export interface CheckHealthEndpoint {
  connected: boolean
  error?: string
}

export async function GET(): Promise<NextResponse<CheckHealthEndpoint>> {
  try {
    await connectMongoose();
    return NextResponse.json({ connected: mongoose.connection.readyState === 1 });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({ connected: false, error: (error as string) });
  }
}
