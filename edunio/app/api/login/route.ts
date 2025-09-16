import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // For now, plain text password comparison (consider hashing in future)
    if (user.password !== password) {
      return NextResponse.json(
        { success: false, message: "Senha incorreta" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login realizado com sucesso",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Erro no login", error: error.message },
      { status: 500 }
    );
  }
}
