import { NextResponse } from 'next/server';
import client from '../../../lib/mongodb';

export interface CheckHealthEndpoint {
  connected: boolean
  error?: string
}

export async function GET(): Promise<NextResponse<CheckHealthEndpoint>> {
  try {
    const db = client.db('your_database_name');
    await db.command({ ping: 1 });
    return NextResponse.json({ connected: true });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({ connected: false, error: (error as string) });
  }
}
