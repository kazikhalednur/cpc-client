import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      studentId,
      department,
      batch,
      bio,
      github,
      linkedin,
      codeforces,
    } = body;

    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name,
        studentId,
        department,
        batch: parseInt(batch),
        bio,
        github,
        linkedin,
        codeforces,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile update error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 