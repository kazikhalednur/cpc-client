import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { Role } from "@/types/role";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const allowedRoles = [Role.SUPER_ADMIN, Role.ADMIN] as const;

    if (
      !session?.user?.role ||
      !allowedRoles.includes(session.user.role as (typeof allowedRoles)[number])
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [totalUsers, totalEvents, totalContests] = await Promise.all([
      prisma.user.count(),
      prisma.event.count(),
      prisma.contest.count(),
    ]).catch((error) => {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch statistics");
    });

    const stats = {
      totalUsers,
      totalEvents,
      totalContests,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal server error",
      { status: 500 }
    );
  }
}
