import ProfileCard from "./components/ProfileCard";
import { CurrentUser } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";
import Skeleton from "@/components/common/Skeleton";
import TreeSection from "@/components/common/TreeSection";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and manage your profile information.",
};

export default async function Profile() {
  const user = await CurrentUser();
  return (
    <div>
      <PageBreadcrumb pageTitle="Profile" backUrl="/home" backUrlName="Home" />
      <Suspense fallback={<Skeleton rows={1} />}>
        <TreeSection depth={0} title="Personal information">
          <ProfileCard user={user} />
        </TreeSection>
      </Suspense>
    </div>
  );
}
