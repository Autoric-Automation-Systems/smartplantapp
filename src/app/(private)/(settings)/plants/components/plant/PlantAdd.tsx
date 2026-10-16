"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import CreatForm from "./PlantCreateForm";
import { PlusIcon } from '@heroicons/react/24/outline';

export default function PlantAdd({ idcompany }: { idcompany: string }) {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div className="mb-4 w-fit">
      <Button
        onClick={openModal}
        title="Add a Plant"
        className="flex items-center justify-center gap-2 rounded-full border border-dashed border-gray-400 px-4 py-2 text-sm font-medium text-gray-600 hover:border-brand-500 hover:text-brand-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-brand-400 dark:hover:text-brand-400 flex-shrink-0"
      >
        <PlusIcon className="w-5 h-5" />
        Add Plant
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <CreatForm closeModal={closeModal} idcompany={idcompany} />
      </Modal>
    </div>
  );
}
