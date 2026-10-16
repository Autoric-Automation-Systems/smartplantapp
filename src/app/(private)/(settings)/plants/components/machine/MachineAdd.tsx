"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import CreatForm from "./MachineCreateForm";
import { PlusIcon } from '@heroicons/react/24/outline';

export default function MachineAdd({ idarea }: { idarea: string }) {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div className="mb-4 w-fit">
      <Button
        onClick={openModal}
        title="Add a Machine for this Area"
        variant="dashed"
        className="w-full sm:w-auto"
      >
        <PlusIcon className="w-5 h-5" />
        Add Machine
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <CreatForm closeModal={closeModal} idarea={idarea} />
      </Modal>
    </div>
  );
}
