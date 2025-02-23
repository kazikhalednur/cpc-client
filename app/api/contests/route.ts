import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ContestDifficulty } from "@prisma/client";

export async function GET() {
  try {
    const contests = await prisma.contest.findMany({
      orderBy: { startTime: "asc" },
    });
    return NextResponse.json(contests);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching contests" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const difficultyValue =
      data.difficulty.toUpperCase() as keyof typeof ContestDifficulty;

    if (!(difficultyValue in ContestDifficulty)) {
      return NextResponse.json(
        { error: "Invalid difficulty level" },
        { status: 400 }
      );
    }
    const contest = await prisma.contest.create({
      data: {
        title: data.title,
        description: data.description,
        startTime: new Date(data.date),
        endTime: new Date(data.date),
        platform: data.platform,
        difficulty: data.difficulty.toUpperCase() as ContestDifficulty,
        prize: data.prize,
        image: data.image,
        status: data.status,
        participants: data.participants || 0,
      },
    });
    return NextResponse.json(contest);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating contest" },
      { status: 500 }
    );
  }
}
