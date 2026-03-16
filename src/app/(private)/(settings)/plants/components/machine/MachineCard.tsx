"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import EditForm from "./MachineEditForm";
import { Machine } from "@/query/machines/definitions";
import { PencilIcon } from '@heroicons/react/24/outline';
import MachineDelete from "./MachineDelete";

export default function MachineCard({ machine }: { machine: Machine }) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="p-4 border border-gray-200 rounded-2xl dark:border-gray-800 mb-4">
      <div className="flex items-center gap-6 justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex gap-8 flex-wrap">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{machine.name}</p>
            </div>
          </div>
        </div>

        <Button
          onClick={openModal}
          title="Edit Machine Information"
          className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 flex-shrink-0"
        >
          <PencilIcon className="w-6 h-6" />
          Edit
        </Button>
        <MachineDelete idmachine={machine.id} />
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <EditForm closeModal={closeModal} machine={machine} />
      </Modal>
    </div>
  );
}
