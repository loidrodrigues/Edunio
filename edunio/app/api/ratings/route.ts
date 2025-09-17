import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../../lib/mongodb";
import Rating from "../../../models/Rating";
import Lesson from "../../../models/Lesson";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();

    const { lessonId, studentId, mentorId, rating, comment } =
      await request.json();

    const newRating = new Rating({
      lesson: lessonId,
      student: studentId,
      mentor: mentorId,
      rating,
      comment,
    });

    await newRating.save();

    // Update lesson with rating
    await Lesson.findByIdAndUpdate(lessonId, { rating: newRating._id });

    return NextResponse.json(newRating, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create rating" },
      { status: 500 }
    );
  }
}
