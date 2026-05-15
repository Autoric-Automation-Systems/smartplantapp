import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";
import MsgPage from "@/components/common/msgPage";
import ComponentCard from "@/components/common/ComponentCard";
import { fetchData } from "@/query/users/data";
import UserCard from "./components/UserCard";
import Skeleton from "@/components/common/skeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users",
  description: "View and manage user information.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const users = await fetchData();
  return (
    <div>
      <PageBreadcrumb pageTitle="Users" backUrl="/home" backUrlName="Home" />
      <MsgPage />
      <Suspense fallback={<Skeleton />}>
        <ComponentCard title="" className="mb-1">
          {users.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
        </ComponentCard>
      </Suspense>
    </div>
  );
}
