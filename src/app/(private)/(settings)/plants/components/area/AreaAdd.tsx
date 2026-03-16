"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import CreatForm from "./AreaCreatForm";
import { PlusIcon } from '@heroicons/react/24/outline';

export default function AreaAdd({ idplant }: { idplant: string }) {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div className="p-4 border border-gray-200 rounded-2xl dark:border-gray-800 mb-4">
      <div className="flex items-center gap-6 justify-between">
        <Button
          onClick={openModal}
          title="Add an Area for this Plant"
          className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 flex-shrink-0"
        >
          <PlusIcon className="w-6 h-6" />
          Add Area
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <CreatForm closeModal={closeModal} idplant={idplant} />
      </Modal>
    </div>
  );
}
