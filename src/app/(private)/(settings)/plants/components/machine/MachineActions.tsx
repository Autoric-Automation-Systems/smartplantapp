"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import IconAction from "@/components/common/IconAction";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Machine } from "@/query/machines/definitions";
import { deleteMachine } from "@/query/machines/actions";
import MachineEditForm from "./MachineEditForm";
import { useState } from "react";

export default function MachineActions({ machine }: { machine: Machine }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <IconAction label="Edit machine" onClick={openModal}>
        <PencilIcon className="h-4 w-4" />
      </IconAction>
      <IconAction label="Delete machine" tone="danger" onClick={() => setConfirmOpen(true)}>
        <TrashIcon className="h-4 w-4" />
      </IconAction>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-lg">
        <MachineEditForm closeModal={closeModal} machine={machine} />
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete machine"
        description={`"${machine.name}" will be deleted. Its devices must be removed first.`}
        onConfirm={() => deleteMachine(machine.id)}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
}
