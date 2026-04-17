import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import infoAPP from "@/lib/infoapp";
import { propsPage } from "@/lib/types";
import MsgPage from "@/components/common/msgPage";
import TableAlarmsOptimized from "./components/TableAlarmsOptimized";
import { fetchDataAllAlarms, fetchAlarmsCount } from "@/query/alarms/data";
import { fetchDataAllDevices, fetchDevicesCount } from "@/query/devices/data";
import { createParamCache } from "@/lib/cache-utils";
import PaginationOptimized from "@/components/common/PaginationOptimized";

export const metadata: Metadata = {
  title: `Alarms Optimized | ${infoAPP.name} ${infoAPP.version}`,
  description: infoAPP.description,
};

// Cache para alarms com parâmetros (5 minutos)
const getCachedAlarms = createParamCache(
  'alarms-list',
  (page: number, limit: number) => fetchDataAllAlarms(page, limit),
  300 // 5 minutos
);

// Cache para devices com parâmetros (10 minutos - mudam menos)
const getCachedDevices = createParamCache(
  'devices-list',
  (page: number, limit: number) => fetchDataAllDevices(page, limit),
  600 // 10 minutos
);

interface PageProps {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 50;

  // Buscar dados em paralelo com cache
  const [alarms, devices, totalAlarms, totalDevices] = await Promise.all([
    getCachedAlarms(page, limit),
    getCachedDevices(page, 100), // Devices com limite maior
    fetchAlarmsCount(),
    fetchDevicesCount(),
  ]);

  const totalPages = Math.ceil(totalAlarms / limit);

  if (alarms.length === 0) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Alarms" backUrl="/dashboard" backUrlName="Dashboard" />
        <MsgPage />
        <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3">
              No Alarms Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              There are no alarms to display at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Alarms (Optimized)" backUrl="/dashboard" backUrlName="Dashboard" />
      <MsgPage />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Alarms</div>
          <div className="text-2xl font-semibold text-gray-800 dark:text-white/90">{totalAlarms}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Devices</div>
          <div className="text-2xl font-semibold text-gray-800 dark:text-white/90">{totalDevices}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="text-sm text-gray-500 dark:text-gray-400">Current Page</div>
          <div className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            {page} of {totalPages}
          </div>
        </div>
      </div>

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <TableAlarmsOptimized
          initialAlarms={alarms}
          devices={devices}
          currentPage={page}
          totalPages={totalPages}
        />

        {/* Paginação */}
        <div className="mt-8">
          <PaginationOptimized
            totalPages={totalPages}
            currentPage={page}
            pageSize={limit}
          />
        </div>
      </div>
    </div>
  );
}