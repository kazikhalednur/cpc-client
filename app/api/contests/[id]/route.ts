import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ContestDifficulty } from "@prisma/client";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    const contest = await prisma.contest.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        startTime: new Date(data.date),
        endTime: new Date(data.date),
        platform: data.platform,
        difficulty: difficultyValue,
        prize: data.prize,
        image: data.image,
        status: data.status,
        participants: data.participants,
      },
    });
    return NextResponse.json(contest);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating contest" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contest.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Contest deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting contest" },
      { status: 500 }
    );
  }
}
