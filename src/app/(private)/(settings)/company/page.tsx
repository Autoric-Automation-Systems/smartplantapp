import { Metadata } from "next";
import React from "react";
import InfoCard from "./components/InfoCard";
import infoAPP from "@/lib/infoapp";
import { CurrentCompany } from "@/lib/utils";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import MsgPage from "@/components/common/msgPage";
import ComponentCard from "@/components/common/ComponentCard";
import { Suspense } from 'react'
import Skeleton from "@/components/common/skeleton";

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
      <Suspense fallback={<Skeleton />}>
        <ComponentCard title="Company Information" className="mb-1">
          <InfoCard company={company} />
        </ComponentCard>
      </Suspense>
    </div>
  );
}
