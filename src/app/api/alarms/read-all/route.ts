import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { auth } from '@/lib/auth';
import { CurrentCompanyId } from '@/lib/utils';

export async function POST() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const currentCompanyId = await CurrentCompanyId();

        await sql`
            UPDATE public.alarms a
            SET readed = true
            FROM public.devices d
            JOIN public.machines m ON d.idmachine = m.id
            JOIN public.areas ar ON m.idarea = ar.id
            JOIN public.plants p ON ar.idplant = p.id
            WHERE a.device_id = d.id
            AND p.idcompany = ${currentCompanyId}
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error marking all alarms as read:', error);
        return NextResponse.json(
            { error: 'Failed to mark all alarms as read' },
            { status: 500 }
        );
    }
}
