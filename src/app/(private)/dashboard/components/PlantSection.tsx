import { fetchDataAreas } from "@/query/areas/data";
import { Plant } from "@/query/plants/definitions";
import TreeSection from "@/components/common/TreeSection";
import AreaSection from "./AreaSection";

export default async function PlantSection({ plant }: { plant: Plant }) {
  const areas = await fetchDataAreas(plant.id);

  return (
    <TreeSection
      depth={0}
      eyebrow="Plant"
      title={plant.name}
      count={areas.length}
    >
      {areas.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No areas configured for this plant.
        </p>
      ) : (
        <div className="space-y-4">
          {areas.map((area) => (
            <AreaSection key={area.id} area={area} />
          ))}
        </div>
      )}
    </TreeSection>
  );
}
