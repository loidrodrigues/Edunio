import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../../lib/mongodb";
import Payment from "../../../models/Payment";
import Lesson from "../../../models/Lesson";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();

    const { lessonId, amount } = await request.json();

    const lesson = await Lesson.findById(lessonId).populate("student mentor");
    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const mentorAmount = amount * (1 - 0.1); // Deduct 10% company fee

    const newPayment = new Payment({
      lesson: lessonId,
      student: lesson.student,
      mentor: lesson.mentor,
      amount,
      mentorAmount,
    });

    await newPayment.save();
    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const payments = await Payment.find({
      $or: [{ student: userId }, { mentor: userId }],
    }).populate("lesson");
    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
