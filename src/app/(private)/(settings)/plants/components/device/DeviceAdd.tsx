"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from '@heroicons/react/24/outline';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DeviceCreatForm from "./DeviceCreatForm";

export default function DeviceAdd({ idmachine }: { idmachine: string }) {
  const { data: session, status } = useSession();
  const { isOpen, openModal, closeModal } = useModal();
  const [devices, setDevices] = useState<any>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    async function loadDevices() {
      const res = await fetch("/api/devices/new");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.startsWith("application/json")) {
        const data = await res.json();
        setDevices(data.devices);
      } else {
        // Handle the case where the response is not JSON
        console.error("Response is not JSON");
      }
    } loadDevices();
  }, [status]);

  return (
    <div className="p-4 border border-gray-200 rounded-2xl dark:border-gray-800 mb-4">
      <div className="flex items-center gap-6 justify-between">
        <Button
          onClick={openModal}
          title="Add an Device for this Plant"
          className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 flex-shrink-0"
        >
          <PlusIcon className="w-6 h-6" />
          Add Device
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <DeviceCreatForm closeModal={closeModal} idmachine={idmachine} devices={devices} />
      </Modal>
    </div>
  );
}
