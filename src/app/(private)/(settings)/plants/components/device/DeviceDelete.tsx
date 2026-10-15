"use client";
import { Delete } from '@/components/ui/button/Delete';
import { deleteDevice } from '@/query/devices/actions';

export default function DeviceDelete({ iddevice }: { iddevice: string }) {
  return (
    <Delete onDelete={() => deleteDevice(iddevice)} />
  );
}
