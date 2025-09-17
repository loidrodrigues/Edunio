import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../../lib/mongodb";
import LessonRequest from "../../../models/LessonRequest";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    // Mock auth: assume mentor ID from query or token
    const mentorId = request.nextUrl.searchParams.get("mentorId");
    if (!mentorId) {
      return NextResponse.json(
        { error: "Mentor ID required" },
        { status: 400 }
      );
    }

    const requests = await LessonRequest.find({
      mentor: mentorId,
      status: "pending",
    }).populate("student", "name email");
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectMongo();

    const { studentId, mentorId, subject, dateTime, message } =
      await request.json();

    const newRequest = new LessonRequest({
      student: studentId,
      mentor: mentorId,
      subject,
      dateTime,
      message,
    });

    await newRequest.save();
    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 }
    );
  }
}
