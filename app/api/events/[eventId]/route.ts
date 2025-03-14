import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.eventId },
    });

    if (!event) {
      return new NextResponse("Event not found", { status: 404 });
    }

    // Add a default image if none exists
    return NextResponse.json({
      ...event,
      image:
        event.image ||
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    });
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
