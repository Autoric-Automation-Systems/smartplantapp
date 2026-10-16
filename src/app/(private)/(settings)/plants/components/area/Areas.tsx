import { fetchDataMachines } from "@/query/machines/data";
import { Area } from "@/query/areas/definitions";
import TreeSection from "@/components/common/TreeSection";
import AreaActions from "./AreaActions";
import MachineAdd from "../machine/MachineAdd";
import Machines from "../machine/Machines";

export default async function Areas({
  plantId,
  areas,
}: {
  plantId: string;
  areas: Area[];
}) {
  const machinesByArea = await Promise.all(
    areas.map((area) => fetchDataMachines(area.id))
  );

  return (
    <div className="space-y-3">
      {areas.map((area, index) => (
        <TreeSection
          key={area.id}
          depth={1}
          eyebrow="Area"
          title={area.name}
          count={machinesByArea[index].length}
          action={<MachineAdd idarea={area.id} />}
          actions={<AreaActions area={area} />}
        >
          {machinesByArea[index].length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No machines yet.
            </p>
          ) : (
            <Machines
              areaId={area.id}
              plantId={plantId}
              machines={machinesByArea[index]}
            />
          )}
        </TreeSection>
      ))}
    </div>
  );
}
