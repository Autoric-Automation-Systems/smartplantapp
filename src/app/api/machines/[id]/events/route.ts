import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { fetchEvents } from "@/query/events/data";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const events = await fetchEvents(id);
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching machine events:", error);
    return NextResponse.json(
      { error: "Failed to fetch machine events" },
      { status: 500 }
    );
  }
}
