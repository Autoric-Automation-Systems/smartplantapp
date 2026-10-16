import { fetchDataMachines } from "@/query/machines/data";
import { Area } from "@/query/areas/definitions";
import TreeSection from "@/components/common/TreeSection";
import MachineSection from "./MachineSection";

export default async function AreaSection({ area }: { area: Area }) {
  const machines = await fetchDataMachines(area.id);

  return (
    <TreeSection depth={1} eyebrow="Area" title={area.name} count={machines.length}>
      {machines.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No machines in this area.
        </p>
      ) : (
        <div className="space-y-3">
          {machines.map((machine) => (
            <MachineSection key={machine.id} machine={machine} />
          ))}
        </div>
      )}
    </TreeSection>
  );
}
