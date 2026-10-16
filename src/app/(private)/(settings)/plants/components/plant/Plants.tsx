import { fetchDataPlants } from "@/query/plants/data";
import { fetchDataAreas } from "@/query/areas/data";
import TreeSection from "@/components/common/TreeSection";
import PlantActions from "./PlantActions";
import AreaAdd from "../area/AreaAdd";
import Areas from "../area/Areas";

/**
 * Nível 1 da árvore de ativos. Cada planta é um card; áreas, máquinas e
 * dispositivos descem indentados dentro dele.
 */
export default async function Plants() {
  const plants = await fetchDataPlants();
  const areasByPlant = await Promise.all(
    plants.map((plant) => fetchDataAreas(plant.id))
  );

  return (
    <>
      {plants.map((plant, index) => (
        <TreeSection
          key={plant.id}
          depth={0}
          eyebrow="Plant"
          title={plant.name}
          count={areasByPlant[index].length}
          action={<AreaAdd idplant={plant.id} />}
          actions={<PlantActions plant={plant} />}
        >
          {areasByPlant[index].length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No areas yet.
            </p>
          ) : (
            <Areas plantId={plant.id} areas={areasByPlant[index]} />
          )}
        </TreeSection>
      ))}
    </>
  );
}
