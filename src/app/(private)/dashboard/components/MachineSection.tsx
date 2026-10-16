import { fetchDataDevices } from "@/query/devices/data";
import { Machine } from "@/query/machines/definitions";
import TreeSection from "@/components/common/TreeSection";
import CardDevice from "./CardDevice";

export default async function MachineSection({ machine }: { machine: Machine }) {
  const devices = await fetchDataDevices(machine.id);

  return (
    <TreeSection
      depth={2}
      eyebrow="Machine"
      title={machine.name}
      count={devices.length}
    >
      {devices.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No devices linked to this machine.
        </p>
      ) : (
        // Duas colunas em telas largas: os cards de dispositivo são altos e,
        // empilhados, deixavam a página muito longa.
        <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
          {devices.map((device) => (
            <CardDevice key={device.id} device={device} />
          ))}
        </div>
      )}
    </TreeSection>
  );
}
