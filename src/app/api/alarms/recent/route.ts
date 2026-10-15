import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { fetchRecentAlarms } from '@/query/alarms/data';

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const recentAlarms = await fetchRecentAlarms()

        return NextResponse.json(recentAlarms);
    } catch (error) {
        console.error('Error fetching recent alarms:', error);
        return NextResponse.json(
            { error: 'Failed to fetch recent alarms' },
            { status: 500 }
        );
    }
}
