import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";
import MsgPage from "@/components/common/msgPage";
import ComponentCard from "@/components/common/ComponentCard";
import { fetchDataPlants } from "@/query/plants/data";
import Plants from "./components/plant/Plants";
import { Suspense } from 'react'
import Skeleton from "@/components/common/skeleton";
import PlantAdd from "./components/plant/PlantAdd";
import { CurrentCompanyId } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Plants | ${infoAPP.name} ${infoAPP.version}`,
  description: infoAPP.description,
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const plants = await fetchDataPlants();
  const idcompany = await CurrentCompanyId();
  if (idcompany === null) {
    return 
  }
  return (
    <div>
      <PageBreadcrumb pageTitle="Plants" backUrl="/home" backUrlName="Home" />
      <MsgPage />
      <PlantAdd idcompany={idcompany} />
      <Suspense fallback={<Skeleton />}>
        <Plants />
      </Suspense>
    </div>
  );
}
