import { NextRequest, NextResponse } from 'next/server';
import { connectMongoose } from '@/lib/mongoose';
import { IError } from '../Types';
import { Event, IEvent } from '@/lib/models/Event';
import { HydratedDocument } from 'mongoose';

export async function GET(): Promise<NextResponse<HydratedDocument<IEvent>[] | IError>> {
  try {
    await connectMongoose();
    // Sort by newest first
    const data = (await Event.find().populate({ path: 'type' })).reverse();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error, description: 'Something went wrong' });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<HydratedDocument<IEvent> | IError>> {
  try {
    await connectMongoose();
    const entry = await req.json();
    const newEntry = new Event(entry);
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
    await Event.deleteOne({ _id: entry._id }) 
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error, description: 'Something went wrong' });
  }
}
