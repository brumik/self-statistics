import mongoose from 'mongoose';

export async function connectMongoose() {
  if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  try {
    await mongoose.connect(`${process.env.NEXT_PUBLIC_MONGODB_URI}/test-db`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
