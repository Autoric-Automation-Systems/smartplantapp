import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import MsgPage from "@/components/common/MsgPage";
import { fetchData } from "@/query/users/data";
import UserRow from "./components/UserRow";
import Skeleton from "@/components/common/Skeleton";
import TreeSection from "@/components/common/TreeSection";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users",
  description: "View and manage user information.",
};

export default async function Page() {
  const users = await fetchData();
  return (
    <div>
      <PageBreadcrumb pageTitle="Users" backUrl="/home" backUrlName="Home" />
      <MsgPage />
      <Suspense fallback={<Skeleton rows={3} />}>
        <TreeSection depth={0} title="Users" count={users.length}>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {users.map((user) => (
              <UserRow user={user} key={user.id} />
            ))}
          </div>
        </TreeSection>
      </Suspense>
    </div>
  );
}
