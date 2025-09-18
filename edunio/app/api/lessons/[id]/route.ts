import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../../../lib/mongodb";
import Lesson from "../../../../models/Lesson";

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    await connectMongo();

    const { meetingLink, studentConfirmed, mentorConfirmed } =
      await request.json();

    const params = await context.params;
    const lessonId = params.id;

    const updateData: any = {};
    if (meetingLink !== undefined) updateData.meetingLink = meetingLink;
    if (studentConfirmed !== undefined)
      updateData.studentConfirmed = studentConfirmed;
    if (mentorConfirmed !== undefined)
      updateData.mentorConfirmed = mentorConfirmed;

    if (studentConfirmed && mentorConfirmed) {
      updateData.status = "completed";
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(lessonId, updateData, {
      new: true,
    });

    if (!updatedLesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json(updatedLesson);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update lesson" },
      { status: 500 }
    );
  }
}
