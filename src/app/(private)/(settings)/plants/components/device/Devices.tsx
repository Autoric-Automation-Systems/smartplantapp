import { fetchDataDevices } from "@/query/devices/data";
import { Plant } from "@/query/plants/definitions";
import DeviceCard from "./DeviceCard";
import ComponentCard from "@/components/common/ComponentCard";
import Machines from "../machine/Machines";
import MachineAdd from "../machine/MachineAdd";
import { Machine } from "@/query/machines/definitions";
import { fetchDataConfigs } from "@/query/configs/data";
import { fetchDataLabel } from "@/query/labels/data";

export default async function Devices({ machine }: { machine: Machine }) {
  const devices = await fetchDataDevices(machine.id);
  return (
    devices.map(async (device) => {
      const configs = await fetchDataConfigs(device.id);
      const label = await fetchDataLabel(device.id);

      return (
        <div key={device.id} className="mb-4 flex flex-col items-center gap-4 ">
          <DeviceCard key={device.id} device={device} configs={configs} label={label} />
        </div>
      );
    })
  );
}        