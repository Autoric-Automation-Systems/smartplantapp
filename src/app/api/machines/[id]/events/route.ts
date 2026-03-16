import { fetchEvents } from "@/query/events/data";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  const events = await fetchEvents(id);

  return Response.json(events);
}