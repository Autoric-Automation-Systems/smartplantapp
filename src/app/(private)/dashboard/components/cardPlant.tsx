import { fetchDataAreas } from "@/query/areas/data";
import { Plant } from "@/query/plants/definitions";
import CardArea from "./cardArea";
import ComponentCard from "@/components/common/ComponentCard";


export default async function CardPlant({ plant }: { plant: Plant }) {
    const areas = await fetchDataAreas(plant.id);

    return (
        <>
            {areas.map((area) => (
                <ComponentCard key={area.id} title={area.name}
                    className="p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-500 dark:border-gray-800 mb-4">
                    <CardArea key={area.id} idarea={area.id} />
                </ComponentCard>
            ))}
        </>
    )
}   
