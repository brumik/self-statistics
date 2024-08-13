import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { connectMongoose } from "@/lib/mongoose";
import { IUser, User } from "@/lib/models/User";
import { IError } from "../../Types";

export interface Post extends IUser {
  rememberMe?: boolean;
}

export async function POST(request: NextRequest): Promise<NextResponse<{} | IError>> {
  try {
    await connectMongoose();
    const { username, password, rememberMe = false } = await request.json() as Post;

    //check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ description: "User does not exist" }, { status: 404 });
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ description: "Invlid password" }, { status: 401 })
    }

    // A JavaScript object (tokenData) is created to store essential user 
    // information. In this case, it includes the user's unique identifier (id), 
    // username, and email.
    const tokenData = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: rememberMe ? "30d" : "1d" });

    const response = NextResponse.json({});
    response.cookies.set("token", token, {
      httpOnly: true,
    })

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error, description: error.message }, { status: 500 })
  }
}
