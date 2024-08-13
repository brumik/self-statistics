import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectMongoose } from "@/lib/mongoose";
import { User } from "@/lib/models/User";
import { IError } from "../../Types";

export interface ISignupSuccess {
  message: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ISignupSuccess | IError>> {
  try {
    await connectMongoose();
    const { username, password } = await request.json();

    const user = await User.findOne({ username });

    if (user) {
      return NextResponse.json({ error: {}, description: "User already exists" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();

    return NextResponse.json({ message: "User created successfully" })
  } catch (error: any) {
    return NextResponse.json({ error: error, description: error.message }, { status: 500 })
  }
}
