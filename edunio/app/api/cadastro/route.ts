import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const user = new User(body);
    await user.save();

    return NextResponse.json({ success: true, message: "Cadastro successful" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Erro no cadastro", error: error.message },
      { status: 500 }
    );
  }
}
