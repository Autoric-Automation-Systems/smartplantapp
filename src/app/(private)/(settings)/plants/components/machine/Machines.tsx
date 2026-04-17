import { Area } from "@/query/areas/definitions";
import MachineCard from "./MachineCard";
import { fetchDataMachines } from "@/query/machines/data";
import DeviceAdd from "../device/DeviceAdd";
import ComponentCard from "@/components/common/ComponentCard";
import Devices from "../device/Devices";

export default async function Machines({ area }: { area: Area }) {
  const machines = await fetchDataMachines(area.id);
  return (
    <div>
      {machines.map((machine) => (
        <div key={area.id}>
          <div className="mb-4 flex flex-col items-center gap-4">
            <MachineCard key={machine.id} machine={machine} />
            <DeviceAdd idmachine={machine.id} />
          </div>
          <ComponentCard title={"Devices"} className="w-full mt-2">
            <Devices machine={machine} />
          </ComponentCard>
        </div>
      ))}
    </div>
  );
}