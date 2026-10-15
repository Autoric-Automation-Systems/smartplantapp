import ComponentCard from "@/components/common/ComponentCard";
import CardPlant from "./cardPlant";
import Image from "next/image";


export default function DashboardSkeleton() {
    return (
        <ComponentCard title="Loading Plants..." className="mb-4">
            <ComponentCard title="Loading Areas..." className="mb-4">
                <ComponentCard title="Loading Areas..." className="mb-4">
                    <>
                        <h1>Loading Machines...</h1>
                        <Image
                            className="w-100 h-100 object-contain"
                            src="/images/logo/logo.png"
                            alt="Loading"
                            width={50}
                            height={50}
                        >
                        </Image>
                    </>
                </ComponentCard>
            </ComponentCard>
        </ComponentCard>
    );
}


export function MachineSkeleton() {
    return (
        <ComponentCard title="Loading Machine..." className="mb-4">
            <>
                <h1>Loading Machines...</h1>
                <Image
                    className="w-100 h-100 object-contain"
                    src="/images/logo/logo.png"
                    alt="Loading"
                    width={50}
                    height={50}
                >
                </Image>
            </>
        </ComponentCard>
    );
}