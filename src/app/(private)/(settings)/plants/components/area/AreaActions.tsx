"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import IconAction from "@/components/common/IconAction";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Area } from "@/query/areas/definitions";
import { deleteArea } from "@/query/areas/actions";
import AreaEditForm from "./AreaEditForm";
import { useState } from "react";

export default function AreaActions({ area }: { area: Area }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <IconAction label="Edit area" onClick={openModal}>
        <PencilIcon className="h-4 w-4" />
      </IconAction>
      <IconAction label="Delete area" tone="danger" onClick={() => setConfirmOpen(true)}>
        <TrashIcon className="h-4 w-4" />
      </IconAction>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-lg">
        <AreaEditForm closeModal={closeModal} area={area} />
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete area"
        description={`"${area.name}" will be deleted. Its machines must be removed first.`}
        onConfirm={() => deleteArea(area.id)}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
}
