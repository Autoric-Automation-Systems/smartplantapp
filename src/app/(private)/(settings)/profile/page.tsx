import infoAPP from "@/lib/infoapp";
import ProfileCard from "./components/ProfileCard";
import { CurrentUser } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from 'react'
import Skeleton from "@/components/common/skeleton";
import ComponentCard from "@/components/common/ComponentCard";

export const metadata: Metadata = {
  title:
    `Profile | ${infoAPP.name}`,
  description: infoAPP.description,
};

export default async function Profile() {
  const user = await CurrentUser();
  return (
    <div>
      <ComponentCard title="Profile" className="mb-1">
        <Suspense fallback={<Skeleton />}>
          <ProfileCard user={user} />
        </Suspense>
      </ComponentCard>
    </div>
  );
}
