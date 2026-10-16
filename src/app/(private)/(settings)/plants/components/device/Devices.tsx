import { fetchDataConfigs } from "@/query/configs/data";
import { fetchDataLabel } from "@/query/labels/data";
import { Device } from "@/query/devices/definitions";
import { formatDateTimeDb } from "@/lib/formatTime";
import TreeSection from "@/components/common/TreeSection";
import DeviceActions from "./DeviceActions";

export default async function Devices({ devices }: { devices: Device[] }) {
  const details = await Promise.all(
    devices.map(async (device) => ({
      configs: await fetchDataConfigs(device.id),
      label: await fetchDataLabel(device.id),
    }))
  );

  return (
    <div className="space-y-3">
      {devices.map((device, index) => (
        <TreeSection
          key={device.id}
          depth={3}
          eyebrow="Device"
          title={device.name ?? device.mac}
          subtitle={`${device.mac} · ${device.type} · last heartbeat ${formatDateTimeDb(device.lastheartbeat) || "—"}`}
          actions={
            <DeviceActions
              device={device}
              configs={details[index].configs}
              label={details[index].label}
            />
          }
        />
      ))}
    </div>
  );
}
