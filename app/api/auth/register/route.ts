import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/schemas/auth.schema";
import { validateBody } from "@/lib/middlewares/validator";

export async function POST(request: Request) {
  // Validate body
  const body = await validateBody(request, registerSchema);

  // If body is not valid, return error
  if (!body.success) {
    return NextResponse.json({ error: body.error.flatten() }, { status: 400 });
  }

  // If password and confirm password do not match, return error
  if(body.data.password !== body.data.confirmPassword) {
    return NextResponse.json({ error: "Le password non coincidono" }, { status: 400 });
  }

  // If body is valid, get data
  const { nome, cognome, email, password } = body.data;
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.operatore.create({
    data: { nome, cognome, email, passwordHash },
  });

  // Return user
  return NextResponse.json(user);
}