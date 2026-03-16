import { fetchDataAreas } from "@/query/areas/data";
import { Plant } from "@/query/plants/definitions";
import AreaCard from "./AreaCard";
import ComponentCard from "@/components/common/ComponentCard";
import Machines from "../machine/Machines";
import MachineAdd from "../machine/MachineAdd";

export default async function Areas({ plant }: { plant: Plant }) {
  const areas = await fetchDataAreas(plant.id);
  return (
    areas.map((area) => (
      <div key={area.id}>
        <div className="mb-4 flex flex-row items-center gap-4">
          <AreaCard key={area.id} area={area} />
          <MachineAdd idarea={area.id} />
        </div>
        <ComponentCard title={"Machines"} className="w-full mt-4">
          <Machines area={area} />
        </ComponentCard>
      </div>
    )));
}        