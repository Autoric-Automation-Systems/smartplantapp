import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { fetchDataAllDevices } from '@/query/devices/data';

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const allDevices = await fetchDataAllDevices();

        return NextResponse.json(allDevices);
    } catch (error) {
        console.error('Error fetching all devices:', error);
        return NextResponse.json(
            { error: 'Failed to fetch all devices' },
            { status: 500 }
        );
    }
}
