"use client";
import { Delete } from '@/components/ui/button/buttons';
import { deleteMachine} from '@/query/machines/actions';

export default function MachineDelete({ idmachine }: { idmachine: string }) {
  return (
    <Delete onDelete={() => deleteMachine(idmachine)} />
  );
}
