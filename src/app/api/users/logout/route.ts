import { NextResponse } from "next/server";
import { IError } from "../../Types";

export async function GET(): Promise<NextResponse<{} | IError>> {
  try {
    const response = NextResponse.json({});
    response.cookies.set("token", "", {
      httpOnly: true, expires: new Date(0)
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error, description: error.message }, { status: 500 });
  }
}
