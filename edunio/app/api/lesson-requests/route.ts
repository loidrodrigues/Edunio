import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../../lib/mongodb";
import LessonRequest from "../../../models/LessonRequest";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    const mentorId = request.nextUrl.searchParams.get("mentorId");
    const studentId = request.nextUrl.searchParams.get("studentId");

    console.log("=== API LESSON REQUESTS DEBUG ===");
    console.log("mentorId:", mentorId);
    console.log("studentId:", studentId);

    let query = {};

    if (mentorId) {
      // Buscar solicitações para um mentor específico (pending)
      query = {
        mentor: mentorId,
        status: "pending",
      };
    } else if (studentId) {
      // Buscar solicitações de um estudante específico (todos os status)
      query = {
        student: studentId,
      };
    } else {
      return NextResponse.json(
        { error: "mentorId or studentId required" },
        { status: 400 }
      );
    }

    console.log("Query:", JSON.stringify(query, null, 2));

    const requests = await LessonRequest.find(query)
      .populate("student", "name email")
      .populate("mentor", "name email");

    console.log("Requests found:", requests.length);
    console.log("Requests data:", JSON.stringify(requests, null, 2));
    console.log("=== FIM API DEBUG ===");

    return NextResponse.json(requests);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectMongo();

    const { studentId, mentorId, message } = await request.json();

    const newRequest = new LessonRequest({
      student: studentId,
      mentor: mentorId,
      subject: null,
      dateTime: null,
      message: message || "",
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
