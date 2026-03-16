import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { fetchDataDevicesNoMachine } from "@/query/devices/data";

export async function GET() {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json(null, { status: 401 });
    }

    const devices = await fetchDataDevicesNoMachine();
    return NextResponse.json({ devices });
}