import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, comments, idmachine } = body;

    if (!content || !idmachine) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO public.events (content, comments, idmachine)
      VALUES (${content}, ${comments}, ${idmachine})
    `;

    return NextResponse.json(
      { message: "Created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Database Error: Failed to Create.",
        message: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
