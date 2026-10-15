import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import Link from "next/link";
import infoAPP from "@/lib/infoapp";

export const metadata: Metadata = {
  title: "Home",
  description: infoAPP.description,
};

export default function Page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Home" />
      <div className="min-h-dvh rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Bem-vindo ao {infoAPP.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            {infoAPP.description}
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 mt-6 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
          >
            Ir para o dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
