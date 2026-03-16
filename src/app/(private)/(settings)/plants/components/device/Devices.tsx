import { fetchDataDevices } from "@/query/devices/data";
import { Plant } from "@/query/plants/definitions";
import DeviceCard from "./DeviceCard";
import ComponentCard from "@/components/common/ComponentCard";
import Machines from "../machine/Machines";
import MachineAdd from "../machine/MachineAdd";
import { Machine } from "@/query/machines/definitions";

export default async function Devices({ machine }: { machine: Machine }) {
  const devices = await fetchDataDevices(machine.id);
  return (
    devices.map((device) => (
      <div key={device.id}>
        <div className="mb-4 flex flex-row items-center gap-4">
          <DeviceCard key={device.id} device={device} />
        </div>
      </div>
    )));
}        