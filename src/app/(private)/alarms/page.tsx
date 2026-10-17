import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import MsgPage from "@/components/common/MsgPage";
import AlarmStats from "./components/AlarmStats";
import AlarmsView from "./components/AlarmsView";
import {
  fetchAlarmsPage,
  fetchAlarmsSummary,
  fetchAlarmFilterOptions,
} from "@/query/alarms/data";
import type { AlarmFilters } from "@/query/alarms/definitions";

export const metadata: Metadata = {
  title: "Alarms",
  description: "Acompanhe e trate os alarmes das suas plantas.",
};

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const filters: AlarmFilters = {
    status: (first(params.status) as AlarmFilters["status"]) || "all",
    event: first(params.event) ?? null,
    device: first(params.device) ?? null,
    period: (first(params.period) as AlarmFilters["period"]) || "all",
    search: first(params.q) ?? null,
  };
  const page = Number(first(params.page) ?? 1) || 1;

  const [summary, options, list] = await Promise.all([
    fetchAlarmsSummary(),
    fetchAlarmFilterOptions(),
    fetchAlarmsPage(filters, page),
  ]);

  return (
    <div>
      <PageBreadcrumb
        pageTitle="Alarms"
        backUrl="/dashboard"
        backUrlName="Dashboard"
      />
      <MsgPage />
      <AlarmStats summary={summary} />
      <AlarmsView
        alarms={list.rows}
        total={list.total}
        page={page}
        filters={filters}
        options={options}
      />
    </div>
  );
}
