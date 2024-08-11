import { NextResponse } from 'next/server';
import { connectMongoose } from '@/lib/mongoose';
import { IError } from '../Types';
import { EventConfig, IEventConfig } from '@/lib/models/EventConfig';

export async function GET(): Promise<NextResponse<IEventConfig[] | IError>> {
  try {
    await connectMongoose();
    const data = await EventConfig.find();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error, description: 'Something went wrong' });
  }
}

export async function POST(req: Request): Promise<NextResponse<IEventConfig | IError>> {
  try {
    await connectMongoose();
    const entry = await req.json();
    const newEntry = new EventConfig(entry);
    await newEntry.save();
    return NextResponse.json(newEntry);
  } catch (error) {
    return NextResponse.json({ error, description: 'Something went wrong' });
  }

}
