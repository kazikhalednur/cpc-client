import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const certificateNumber = searchParams.get("number");

    if (!certificateNumber) {
      return new NextResponse("Certificate number is required", { status: 400 });
    }

    const certificate = await prisma.certificate.findUnique({
      where: { certificateNumber },
      include: {
        user: true,
        event: true,
      },
    });

    if (!certificate) {
      return new NextResponse("Certificate not found", { status: 404 });
    }

    return NextResponse.json({
      id: certificate.id,
      studentName: certificate.user.name,
      studentId: certificate.user.studentId,
      eventName: certificate.event.title,
      issueDate: certificate.issueDate,
      certificateNumber: certificate.certificateNumber,
      status: "valid",
    });
  } catch (error) {
    console.error("Certificate verification error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 