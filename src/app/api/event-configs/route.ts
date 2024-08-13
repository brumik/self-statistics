import { NextRequest, NextResponse } from 'next/server';
import { connectMongoose } from '@/lib/mongoose';
import { IError } from '../Types';
import { EventConfig, IEventConfig } from '@/lib/models/EventConfig';
import { HydratedDocument } from 'mongoose';
import { getDataFromToken } from '@/app/helpers/decodeToken';

export async function GET(request: NextRequest): Promise<NextResponse<HydratedDocument<IEventConfig>[] | IError>> {
  try {
    await connectMongoose();
    const userId = await getDataFromToken(request);

    // Sort by newest first
    const data = (await EventConfig.find({ user: userId })).reverse();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error, description: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<HydratedDocument<IEventConfig> | IError>> {
  try {
    await connectMongoose();
    const userId = await getDataFromToken(request);
    const entry = await request.json();

    const newEntry = new EventConfig({ ...entry, user: userId });
    await newEntry.save();

    return NextResponse.json(newEntry);
  } catch (error) {
    return NextResponse.json({ error, description: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse<{} | IError>> {
  try {
    await connectMongoose();
    const userId = await getDataFromToken(request);
    const entry = await request.json();
    
    if (entry.user !== userId) {
      return NextResponse.json({
        description: 'Access denied to delete other users event'
      }, { status: 403 });
    }    

    await EventConfig.deleteOne({ _id: entry._id }) 
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error, description: 'Something went wrong' }, { status: 500 });
  }
}
