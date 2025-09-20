import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Verificar se o email já existe
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Esse email já foi cadastrado, por favor usar outro ou fazer login",
        },
        { status: 400 }
      );
    }

    const user = new User(body);
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Cadastro realizado com sucesso!",
    });
  } catch (error: any) {
    console.error(error);

    // Verificar se é erro de email duplicado (apesar da verificação acima, pode ocorrer em casos de race condition)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Esse email já foi cadastrado, por favor usar outro ou fazer login",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Erro no cadastro", error: error.message },
      { status: 500 }
    );
  }
}
