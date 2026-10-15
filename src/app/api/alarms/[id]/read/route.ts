import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { CurrentCompanyId } from '@/lib/utils';
import { markAlarmAsRead } from '@/lib/authz';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Em algumas versões do Next.js 16, params é uma Promise
        const { id } = await params;
        const idcompany = await CurrentCompanyId();

        const updated = await markAlarmAsRead(id, idcompany);
        if (updated === 0) {
            return NextResponse.json({ error: 'Alarm not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error marking alarm as read:', error);
        return NextResponse.json(
            { error: 'Failed to mark alarm as read' },
            { status: 500 }
        );
    }
}
