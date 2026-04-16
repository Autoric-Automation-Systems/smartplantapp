import ComponentCard from "@/components/common/ComponentCard";
import { fetchDataDevices } from "@/query/devices/data";
import CardDevice from "./cardDevice";

export default async function CardMachine({ idmachine }: { idmachine: string }) {
    const devices = await fetchDataDevices(idmachine);
    return (
        <div>
            {devices.map(async (device) => (
                <CardDevice device={device} key={device.id} />
            ))}
        </div>
    )
}