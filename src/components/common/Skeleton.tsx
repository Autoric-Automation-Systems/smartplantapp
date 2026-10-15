import ComponentCard from "@/components/common/ComponentCard";
import Image from "next/image";


export default function Skeleton() {
    return (
        <ComponentCard title="Loading..." className="mb-4">
            <>
                <h1>Loading...</h1>
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