import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../../lib/mongodb";
import User from "../../../models/User";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    const mentorsOnly = request.nextUrl.searchParams.get("mentors");

    let query = {};
    if (mentorsOnly === "true") {
      query = { isMentor: true };
    }

    const users = await User.find(query).select("-password"); // Exclude password
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
