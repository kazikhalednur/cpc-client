import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Role } from "@/types/role";

export async function POST(req: Request) {
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
    const event = await prisma.event.create({
      data: {
        ...data,
        eventDate: new Date(data.eventDate),
        registrationDeadline: new Date(data.registrationDeadline),
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Failed to create event:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where = {
      ...(status && { status }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { shortDescription: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const events = await prisma.event.findMany({
      where,
      orderBy: { eventDate: "asc" },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
