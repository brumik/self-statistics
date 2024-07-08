import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('your_database_name');
    await db.command({ ping: 1 });
    return NextResponse.json({ connected: true });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({ connected: false, error });
  }
}
