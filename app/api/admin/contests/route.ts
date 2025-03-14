import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Role } from "@/types/role";
import { ContestDifficulty, Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const allowedRoles = [Role.SUPER_ADMIN, Role.ADMIN] as const;
    if (
      !session?.user?.role ||
      !allowedRoles.includes(session.user.role as (typeof allowedRoles)[number])
    ) {
      return new NextResponse(
        JSON.stringify({
          error: "Unauthorized",
          message: "You don't have permission to create contests",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await req.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "startTime",
      "endTime",
      "platform",
      "difficulty",
      "prize",
    ];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return new NextResponse(
        JSON.stringify({
          error: "Validation Error",
          message: `Missing required fields: ${missingFields.join(", ")}`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate dates
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);

    if (isNaN(startTime.getTime())) {
      return new NextResponse(
        JSON.stringify({
          error: "Invalid Date",
          message: "Start time is not a valid date",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (isNaN(endTime.getTime())) {
      return new NextResponse(
        JSON.stringify({
          error: "Invalid Date",
          message: "End time is not a valid date",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (endTime < startTime) {
      return new NextResponse(
        JSON.stringify({
          error: "Invalid Date Range",
          message: "End time cannot be before start time",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create contest with validated data
    const contest = await prisma.contest.create({
      data: {
        title: data.title,
        description: data.description,
        startTime,
        endTime,
        platform: data.platform,
        difficulty: data.difficulty as ContestDifficulty,
        prize: data.prize,
        image: data.image || "",
        status: data.status || "UPCOMING",
        participants: 0,
      },
    });

    return NextResponse.json({
      message: "Contest created successfully",
      data: contest,
    });
  } catch (error) {
    console.error("Failed to create contest. Error:", error);

    if (error instanceof Prisma.PrismaClientValidationError) {
      return new NextResponse(
        JSON.stringify({
          error: "Validation Error",
          message: "Invalid data format provided",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma errors
      switch (error.code) {
        case "P2002":
          return new NextResponse(
            JSON.stringify({
              error: "Duplicate Entry",
              message: "A contest with this title already exists",
            }),
            { status: 409, headers: { "Content-Type": "application/json" } }
          );
        default:
          return new NextResponse(
            JSON.stringify({
              error: "Database Error",
              message: "Failed to create contest",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
      }
    }

    return new NextResponse(
      JSON.stringify({
        error: "Internal Server Error",
        message: "An unexpected error occurred",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const allowedRoles = [Role.SUPER_ADMIN, Role.ADMIN] as const;
    if (
      !session?.user?.role ||
      !allowedRoles.includes(session.user.role as (typeof allowedRoles)[number])
    ) {
      return new NextResponse(
        JSON.stringify({
          error: "Unauthorized",
          message: "You don't have permission to view contests",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const contests = await prisma.contest.findMany({
      orderBy: { startTime: "desc" },
    });

    return NextResponse.json(contests);
  } catch (error) {
    console.error("Failed to fetch contests:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Internal Server Error",
        message: "Failed to fetch contests",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
