import { NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://127.0.0.1:8000";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Forward the request to the backend API
    const backendUrl = `${BACKEND_BASE_URL}/events/`;
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch events from backend:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
