import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../../lib/mongodb";
import Lesson from "../../../models/Lesson";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    const userId = request.nextUrl.searchParams.get("userId");
    const role = request.nextUrl.searchParams.get("role"); // "mentor" or "student"

    if (!userId || !role) {
      return NextResponse.json(
        { error: "User ID and role required" },
        { status: 400 }
      );
    }

    const query = role === "mentor" ? { mentor: userId } : { student: userId };
    const lessons = await Lesson.find(query)
      .populate("mentor", "name")
      .populate("student", "name");

    return NextResponse.json(lessons);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}
