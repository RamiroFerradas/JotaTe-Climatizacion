import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json("Todo ok");
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
