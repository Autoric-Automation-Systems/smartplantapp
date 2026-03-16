"use client";
import { Delete } from '@/components/ui/button/buttons';
import { deleteDevice } from '@/query/devices/actions';

export default function DeviceDelete({ iddevice }: { iddevice: string }) {
  return (
    <Delete onDelete={() => deleteDevice(iddevice)} />
  );
}
