import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";
import { propsPage } from "@/lib/types";
import MsgPage from "@/components/common/msgPage";
import ComponentCard from "@/components/common/ComponentCard";
import { fetchData } from "@/query/users/data";
import UserInfoCard from "../../components/UserCard";

export const metadata: Metadata = {
  title: "Users",
  description: "View and manage user information.",
};

export default async function Page({ props }: { props: propsPage }) {
  const users = fetchData();
  //console.log(props);
  return (
    <div>
      <PageBreadcrumb pageTitle="Users" backUrl="/home" backUrlName="Home" />
      <MsgPage />
      {(await users).map((user) => (
        <ComponentCard key={user.id} title={user.name} className="mb-4">
          <UserInfoCard user={user} />
        </ComponentCard>
      ))}
    </div>
  );
}
