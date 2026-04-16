"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import EditForm from "./DeviceEditForm";
import { Device } from "@/query/devices/definitions";
import { PencilIcon } from "@/icons";
import DeviceDelete from "./DeviceDelete";
import { formatDateTimeDb, formatDateToLocal, formatDateToTimeDb, formatTime, FullDateToDateTime } from "@/lib/formatTime";
import { format } from "path";
import { Config } from "@/query/configs/definitions";
import ConfigEditForm from "./ConfigEditForm";
import { config } from "next/dist/build/templates/pages";

export default function DeviceCard({ device, configs }: { device: Device; configs: Config[] }) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="p-4 border border-gray-200 rounded-2xl dark:border-gray-800 mb-4">
      <div className="flex items-center gap-6 justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex gap-8 flex-wrap">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">NAME | MAC | TYPE </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{device.name} | {device.mac} | {device.type}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">CREATED AT | LAST HEARTBEAT </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{formatDateTimeDb(device.created_at)} | {formatDateTimeDb(device.lastheartbeat)}</p>
            </div>
          </div>
        </div>

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
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <EditForm closeModal={closeModal} device={device} />
        <h4 className="m-8 mt-4 text-center text-2xl font-semibold text-gray-800 dark:text-white/90">
          Configurations
        </h4>
        {configs.map((config) => (
          <ConfigEditForm key={config.id} closeModal={closeModal} config={config} />
        ))}
      </Modal>
    </div>
  );
}
