import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";
import { fetchById } from "@/query/machines/data";
import MachineEvents from "../components/MachineEvents";
import { Suspense } from "react";
import MachineSkeleton from "../components/skeleton";
import DashboardSkeleton from "../../dashboard/components/skeleton";

export const metadata: Metadata = {
  title: `Machine View | ${infoAPP.name} ${infoAPP.version}`,
  description: infoAPP.description,
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const machine = await fetchById(id);
  return (
    <div>
      <PageBreadcrumb
        pageTitle={machine.name}
        backUrl="/dashboard"
        backUrlName="Dashboard"
      />
      <Suspense fallback={<MachineSkeleton />}>
        <MachineEvents idmachine={id} />
      </Suspense>
    </div>
  );
}