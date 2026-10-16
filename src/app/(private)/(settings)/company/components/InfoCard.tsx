"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { PencilIcon } from "@heroicons/react/24/outline";
import IconAction from "@/components/common/IconAction";
import EditForm from "./EditForm";
import { Company } from "@/query/companies/definitions";

export default function InfoCard({ company }: { company: Company }) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="mb-0.5 block text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Company
          </span>
          <h3 className="truncate text-base font-semibold text-gray-800 dark:text-white/90">
            {company.name}
          </h3>
        </div>
        <IconAction label="Edit company" onClick={openModal}>
          <PencilIcon className="h-4 w-4" />
        </IconAction>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-lg">
        <EditForm closeModal={closeModal} company={company} />
      </Modal>
    </>
  );
}
