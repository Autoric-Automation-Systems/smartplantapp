import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { CurrentCompanyId } from '@/lib/utils';
import { fetchRecentAlarms } from '@/query/alarms/data';

export async function GET(request: NextRequest) {
    try {
        const currentCompanyId = await CurrentCompanyId();
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