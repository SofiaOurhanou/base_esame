import { validateBody } from "@/lib/middlewares/validator";
import prisma from "@/lib/prisma";
import { loginSchema } from "@/lib/schemas/auth.schema";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {  
  // Validate body
  const body = await validateBody(request, loginSchema);

  // If body is not valid, return error
  if (!body.success) {
    return NextResponse.json({ error: body.error.flatten() }, { status: 400 });
  }

  // If body is valid, get data
  const { email, password } = body.data;

  // Find user
  const user = await prisma.operatore.findUnique({
    where: { email },
  });

  // If user is not found, return error
  if (!user) {
    return NextResponse.json({ error: "Operatore non trovato" }, { status: 404 });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  // If password is not valid, return error
  if (!isPasswordValid) {
    return NextResponse.json({ error: "Password non valida" }, { status: 401 });
  }

  // Remove password from user
  const { passwordHash, ...userWithoutPassword } = user;

  // Generate token
  const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET as string);

  // If password is valid, return user
  return NextResponse.json({ ...userWithoutPassword, token: token }, { status: 200 });
}