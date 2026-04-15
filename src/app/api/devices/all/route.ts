import { NextRequest, NextResponse } from 'next/server';
import { fetchDataAllDevices } from '@/query/devices/data';

export async function GET(request: NextRequest) {
    try {
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