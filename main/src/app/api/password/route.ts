import { NextResponse } from "next/server";


// GET /api/password/:email
export async function GET() {
  try {

    return NextResponse.json(
      {
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
