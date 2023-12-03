import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isUserExisted = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!isUserExisted) {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          hashedPassword,
        },
      });
      return NextResponse.json({
        status: "OK",
        message: "created successfully!",
        data: user,
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: "user already exists",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "catches error" + error,
    });
  }
}
