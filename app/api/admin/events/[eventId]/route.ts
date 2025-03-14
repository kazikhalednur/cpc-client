import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { Role } from "@/types/role";

export async function PUT(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const allowedRoles = [Role.SUPER_ADMIN, Role.ADMIN] as const;

    if (
      !session?.user?.role ||
      !allowedRoles.includes(session.user.role as (typeof allowedRoles)[number])
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    const { eventId } = params;

    // Validate that event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      return new NextResponse("Event not found", { status: 404 });
    }

    const event = await prisma.event.update({
      where: { id: eventId },
      data: {
        title: data.title,
        shortDescription: data.shortDescription,
        description: data.description,
        image: data.image,
        keynoteSpeaker: data.keynoteSpeaker,
        guests: data.guests.filter(Boolean), // Remove empty strings
        eventDate: new Date(data.eventDate),
        registrationDeadline: new Date(data.registrationDeadline),
        venue: data.venue,
        status: data.status,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Failed to update event:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to update event",
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const allowedRoles = [Role.SUPER_ADMIN, Role.ADMIN] as const;

    if (
      !session?.user?.role ||
      !allowedRoles.includes(session.user.role as (typeof allowedRoles)[number])
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { eventId } = params;

    await prisma.event.delete({
      where: { id: eventId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete event:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

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

    return NextResponse.json(event);
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
