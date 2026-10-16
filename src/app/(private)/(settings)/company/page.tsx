import { Metadata } from "next";
import InfoCard from "./components/InfoCard";
import { CurrentCompany } from "@/lib/utils";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import MsgPage from "@/components/common/MsgPage";
import Skeleton from "@/components/common/Skeleton";
import TreeSection from "@/components/common/TreeSection";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Company",
  description: "View and manage your company information.",
};

export default async function Company() {
  const company = await CurrentCompany();
  return (
    <div>
      <PageBreadcrumb pageTitle="Company" backUrl="/home" backUrlName="Home" />
      <MsgPage />
      <Suspense fallback={<Skeleton rows={1} />}>
        <TreeSection depth={0} title="Company information">
          <InfoCard company={company} />
        </TreeSection>
      </Suspense>
    </div>
  );
}
