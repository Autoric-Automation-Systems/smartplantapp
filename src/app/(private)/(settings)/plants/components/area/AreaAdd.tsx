"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import CreatForm from "./AreaCreateForm";
import { PlusIcon } from '@heroicons/react/24/outline';

export default function AreaAdd({ idplant }: { idplant: string }) {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div className="mb-4 w-fit">
      <Button
        onClick={openModal}
        title="Add an Area for this Plant"
        variant="dashed"
        className="w-full sm:w-auto"
      >
        <PlusIcon className="w-5 h-5" />
        Add Area
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <CreatForm closeModal={closeModal} idplant={idplant} />
      </Modal>
    </div>
  );
}
