"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import IconAction from "@/components/common/IconAction";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Plant } from "@/query/plants/definitions";
import { deleteData } from "@/query/plants/actions";
import PlantEditForm from "./PlantEditForm";
import { useState } from "react";

export default function PlantActions({ plant }: { plant: Plant }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <IconAction label="Edit plant" onClick={openModal}>
        <PencilIcon className="h-4 w-4" />
      </IconAction>
      <IconAction label="Delete plant" tone="danger" onClick={() => setConfirmOpen(true)}>
        <TrashIcon className="h-4 w-4" />
      </IconAction>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-lg">
        <PlantEditForm closeModal={closeModal} plant={plant} />
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete plant"
        description={`"${plant.name}" will be deleted. Areas and machines linked to it must be removed first.`}
        onConfirm={() => deleteData(plant.id)}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
}
