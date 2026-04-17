import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Em algumas versões do Next.js 16, params é uma Promise
        const { id } = await params;

        await sql`
            UPDATE public.alarms
            SET readed = true
            WHERE id = ${id}
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error marking alarm as read:', error);
        return NextResponse.json(
            { error: 'Failed to mark alarm as read' },
            { status: 500 }
        );
    }
}