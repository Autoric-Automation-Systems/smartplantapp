"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import EditForm from "./DeviceEditForm";
import { Device } from "@/query/devices/definitions";
import { PencilIcon } from "@/icons";
import DeviceDelete from "./DeviceDelete";
import { formatDateTimeDb, formatDateToLocal, formatDateToTimeDb, formatTime, FullDateToDateTime } from "@/lib/formatTime";
import { Config } from "@/query/configs/definitions";
import ConfigEditForm from "./ConfigEditForm";
import { Label } from "@/query/labels/definitions";
import LabelEditForm from "./LabelEditForm";

export default function DeviceCard({ device, configs, label }: { device: Device; configs: Config[]; label: Label }) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="p-4 flex flex-col border border-gray-200 rounded-2xl dark:border-gray-800 mb-4">
      <div className="flex flex-col items-center gap-6 justify-between">
        <div className="flex items-center gap-4 flex-1 flex-col items-start sm:flex-row sm:items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">NAME | MAC | TYPE </p>
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">{device.name} | {device.mac} | {device.type}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">CREATED AT | LAST HEARTBEAT </p>
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">{formatDateTimeDb(device.created_at)} | {formatDateTimeDb(device.lastheartbeat)}</p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0 flex-col items-start sm:flex-row sm:items-center sm:gap-2">
          <Button
            onClick={openModal}
            title="Edit Area Information"
            className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 flex-shrink-0"
          >
            <PencilIcon className="w-6 h-6" />
            Edit
          </Button>
          <DeviceDelete iddevice={device.id} />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4 mt-24 lg:mt-22 xl:mt-22 2xl:mt-18 sm:mt-18">
        <EditForm closeModal={closeModal} device={device} />
        <h4 className="m-8 mt-4 text-center text-2xl font-semibold text-gray-800 dark:text-white/90">
          Configurations
        </h4>
        {configs.map((config) => (
          <ConfigEditForm key={config.id} closeModal={closeModal} config={config} />
        ))}
        {label && (
          <LabelEditForm key={label.id} closeModal={closeModal} label={label} />
        )}
      </Modal>
    </div>
  );
}
