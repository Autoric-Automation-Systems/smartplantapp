import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from 'next';
import infoAPP from "@/lib/infoapp";
import MsgPage from "@/components/common/MsgPage";
import { fetchDataPlants } from '@/query/plants/data';
import PlantSection from "./components/PlantSection";
import Revalidate from "@/components/common/Revalidate";
import { Suspense } from 'react';
import DashboardSkeleton from "./components/Skeleton";
import { CurrentCompany } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Dashboard`,
  description: "Dashboard do Smart Plant - Acompanhe o desempenho das suas plantas, visualize dados em tempo real e tome decisões informadas para otimizar o crescimento e a saúde das suas plantas. Acesse insights valiosos e monitore o progresso do seu jardim inteligente com facilidade.",
};

export default async function Page() {
  const company = await CurrentCompany();
  const plants = await fetchDataPlants();
  return (
    <div>
      <Revalidate>
        <PageBreadcrumb
          pageTitle={`Dashboard | ${company.name}`}
          backUrl="/home"
          backUrlName="Home"
        />
        <MsgPage />
        <Suspense fallback={<DashboardSkeleton />}>
          {plants.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
              No plants yet. Add one in Settings → Plants.
            </p>
          ) : (
            plants.map((plant) => <PlantSection key={plant.id} plant={plant} />)
          )}
        </Suspense>
      </Revalidate>
    </div>
  );
}
