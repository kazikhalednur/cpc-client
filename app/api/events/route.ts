import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: Prisma.EventWhereInput = {
      ...(status && { status: status as "UPCOMING" | "ONGOING" | "COMPLETED" }),
      ...(search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
          {
            shortDescription: {
              contains: search,
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
        ],
      }),
    };

    const events = await prisma.event.findMany({
      where,
      orderBy: { eventDate: "asc" },
    });

    // Add default image for events without images
    const eventsWithImages = events.map((event) => ({
      ...event,
      image:
        event.image ||
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    }));

    return NextResponse.json(eventsWithImages);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
