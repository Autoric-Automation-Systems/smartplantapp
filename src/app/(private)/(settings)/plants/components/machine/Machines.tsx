import { fetchDataDevices } from "@/query/devices/data";
import { Machine } from "@/query/machines/definitions";
import TreeSection from "@/components/common/TreeSection";
import MachineActions from "./MachineActions";
import DeviceAdd from "../device/DeviceAdd";
import Devices from "../device/Devices";

export default async function Machines({
  areaId,
  machines,
}: {
  areaId: string;
  plantId: string;
  machines: Machine[];
}) {
  const devicesByMachine = await Promise.all(
    machines.map((machine) => fetchDataDevices(machine.id))
  );

  return (
    <div className="space-y-3">
      {machines.map((machine, index) => (
        <TreeSection
          key={machine.id}
          depth={2}
          eyebrow="Machine"
          title={machine.name}
          count={devicesByMachine[index].length}
          action={<DeviceAdd idmachine={machine.id} />}
          actions={<MachineActions machine={machine} />}
        >
          {devicesByMachine[index].length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No devices yet.
            </p>
          ) : (
            <Devices devices={devicesByMachine[index]} />
          )}
        </TreeSection>
      ))}
    </div>
  );
}
