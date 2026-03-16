import { fetchDataPlants } from "@/query/plants/data";
import PlantCard from "./PlantCard";
import Areas from "../area/Areas";
import ComponentCard from "@/components/common/ComponentCard";
import AreaAdd from "../area/AreaAdd";
import PlantDelete from "./PlantDelete";

export default async function Plants() {
  const plants = await fetchDataPlants();
  return (
    plants.map((plant) => (
      <div key={plant.id}>
        <ComponentCard
          title={"Plant"}
          className="w-full mt-4"
        >
          <div className="mb-4 flex flex-row items-center gap-4">
            <PlantCard plant={plant} />
            <AreaAdd idplant={plant.id} />
          </div>
          <ComponentCard
            title={"Areas"}
            className="w-full mt-4"
          >
            <Areas plant={plant} />

          </ComponentCard>
        </ComponentCard>
      </div>
    ))
  );
}