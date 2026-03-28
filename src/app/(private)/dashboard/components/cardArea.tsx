import { fetchDataMachines } from "@/query/machines/data";
import CardMachine from "./cardMachine";
import ComponentCard from "@/components/common/ComponentCard";
import Link from "next/link";

export default async function CardArea({ idarea }: { idarea: string }) {
    const machines = await fetchDataMachines(idarea);

    return (
        <>
            {machines.map((machine) => (
                <Link
                    key={machine.id}
                    href={`/machines/${machine.id}`}
                >
                    <ComponentCard
                        title={machine.name}
                        className="p-0 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-500 dark:border-gray-800 mb-4">
                        <CardMachine idmachine={machine.id} />
                    </ComponentCard>
                </Link>
            ))}
        </>
    )
}