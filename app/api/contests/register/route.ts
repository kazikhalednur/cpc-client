import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get user ID from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user?.id) {
      return new NextResponse("User not found", { status: 404 });
    }

    const { contestId } = await req.json();

    // Check if contest exists and registration is open
    const contest = await prisma.contest.findUnique({
      where: { id: contestId },
    });

    if (!contest) {
      return new NextResponse("Contest not found", { status: 404 });
    }

    // Check if user is already registered
    const existingRegistration = await prisma.contestParticipation.findFirst({
      where: {
        userId: user.id,
        contestId,
      },
    });

    if (existingRegistration) {
      return new NextResponse("Already registered", { status: 400 });
    }

    // Create registration
    const registration = await prisma.contestParticipation.create({
      data: {
        userId: user.id,
        contestId,
      },
    });

    return NextResponse.json(registration);
  } catch (error) {
    console.error("Contest registration error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
