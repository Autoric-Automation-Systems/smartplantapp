"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import IconAction from "@/components/common/IconAction";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Tabs from "@/components/common/Tabs";
import { Device } from "@/query/devices/definitions";
import { deleteDevice } from "@/query/devices/actions";
import { Config } from "@/query/configs/definitions";
import { Label as LabelDefinition } from "@/query/labels/definitions";
import DeviceEditForm from "./DeviceEditForm";
import ConfigEditForm from "./ConfigEditForm";
import LabelEditForm from "./LabelEditForm";
import { useState } from "react";

type DeviceActionsProps = {
  device: Device;
  configs: Config[];
  label: LabelDefinition | undefined;
};

/**
 * Edição do dispositivo em abas. Antes o modal empilhava o formulário do
 * dispositivo, o cabeçalho "Configurations" e um formulário completo (com
 * título e botões próprios) para cada evento monitorado.
 */
export default function DeviceActions({ device, configs, label }: DeviceActionsProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const tabs = [
    {
      id: "device",
      label: "Device",
      content: <DeviceEditForm device={device} />,
    },
    {
      id: "configs",
      label: "Configurations",
      badge: configs.length,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Alarm limits per monitored event. Ranges outside of Min/Max raise an alarm when
            the toggle is on.
          </p>
          {configs.length === 0 ? (
            <p className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
              No configuration yet. It is created automatically when the device sends its first event.
            </p>
          ) : (
            configs.map((config) => <ConfigEditForm key={config.id} config={config} />)
          )}
        </div>
      ),
    },
    {
      id: "labels",
      label: "Labels",
      content: label ? (
        <LabelEditForm label={label} />
      ) : (
        <p className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          No labels yet. They are created automatically with the counting events.
        </p>
      ),
    },
  ];

  return (
    <>
      <IconAction label="Edit device" onClick={openModal}>
        <PencilIcon className="h-4 w-4" />
      </IconAction>
      <IconAction label="Delete device" tone="danger" onClick={() => setConfirmOpen(true)}>
        <TrashIcon className="h-4 w-4" />
      </IconAction>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-3xl">
        <div className="p-5 sm:p-7">
          <header className="pr-10">
            <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Device
            </span>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {device.name}
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {device.mac} · {device.type}
            </p>
          </header>

          <div className="mt-5">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete device"
        description={`"${device.name}" and all of its events will be deleted. This cannot be undone.`}
        onConfirm={() => deleteDevice(device.id)}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
}
