import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";
import { propsPage } from "@/lib/types";
import MsgPage from "@/components/common/msgPage";
import TableAlarms from "./tableAlarms";
import { fetchDataAllAlarms } from "@/query/alarms/data";
import { fetchDataAllDevices } from "@/query/devices/data";

export const metadata: Metadata = {
  title:
    `Blank Page | ${infoAPP.name} ${infoAPP.version}`,
  description: infoAPP.description,
};

export default async function Page({ props }: { props: propsPage }) {
  const [alarms, devices] = await Promise.all([
    fetchDataAllAlarms(),
    fetchDataAllDevices()
  ]);

  if (alarms.length === 0) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Alarms" backUrl="/dashboard" backUrlName="Dashboard" />
        <MsgPage />
      </div>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Alarms" backUrl="/dashboard" backUrlName="Dashboard" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <TableAlarms initialAlarms={alarms} devices={devices} />
      </div>
    </div>
  );
}
