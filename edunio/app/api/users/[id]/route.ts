import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    await connectMongo();

    const updates = await request.json();

    // Await params if it's a Promise
    const params = await context.params;
    const userId = params.id;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
