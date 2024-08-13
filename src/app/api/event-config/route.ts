import { NextRequest, NextResponse } from 'next/server';
import { connectMongoose } from '@/lib/mongoose';
import { IError } from '../Types';
import { EventConfig, IEventConfig } from '@/lib/models/EventConfig';
import { HydratedDocument } from 'mongoose';

export async function GET(): Promise<NextResponse<HydratedDocument<IEventConfig>[] | IError>> {
  try {
    await connectMongoose();
    // Sort by newest first
    const data = (await EventConfig.find()).reverse();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error, description: 'Something went wrong' });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<HydratedDocument<IEventConfig> | IError>> {
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

export async function DELETE(req: NextRequest): Promise<NextResponse<{} | IError>> {
  try {
    await connectMongoose();
    const entry = await req.json();
    await EventConfig.deleteOne({ _id: entry._id }) 
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error, description: 'Something went wrong' });
  }
}
