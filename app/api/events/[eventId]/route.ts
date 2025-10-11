import { NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://127.0.0.1:8000";

export async function GET(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    // Forward the request to the backend API
    const backendUrl = `${BACKEND_BASE_URL}/events/${params.eventId}/`;
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return new NextResponse("Event not found", { status: 404 });
      }
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch event from backend:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
