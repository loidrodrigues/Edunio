import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../../../lib/mongodb";
import LessonRequest from "../../../../models/LessonRequest";
import Lesson from "../../../../models/Lesson";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();

    const { status } = await request.json();
    const requestId = params.id;

    const updatedRequest = await LessonRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (status === "accepted") {
      // Create lesson
      const newLesson = new Lesson({
        request: requestId,
        student: updatedRequest.student,
        mentor: updatedRequest.mentor,
        subject: updatedRequest.subject,
        dateTime: updatedRequest.dateTime,
      });
      await newLesson.save();
    }

    return NextResponse.json(updatedRequest);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update request" },
      { status: 500 }
    );
  }
}
