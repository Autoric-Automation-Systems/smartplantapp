"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from '@heroicons/react/24/outline';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DeviceCreatForm from "./DeviceCreateForm";

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
    <div className="mb-4 w-fit">
      <Button
        onClick={openModal}
        title="Add an Device for this Plant"
        variant="dashed"
        className="w-full sm:w-auto"
      >
        <PlusIcon className="w-5 h-5" />
        Add Device
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <DeviceCreatForm closeModal={closeModal} idmachine={idmachine} devices={devices} />
      </Modal>
    </div>
  );
}
