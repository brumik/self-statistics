import { getDataFromToken } from "@/app/helpers/decodeToken";
import { IUserHydrated, User } from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";
import { IError } from "../../Types";

export async function GET(request: NextRequest): Promise<NextResponse<IUserHydrated | IError>> {
  try {
    const userId = await getDataFromToken(request);

    // Find the user in the database based on the user ID
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json({ error: error, description: error.message }, { status: 400 })
  }
}

