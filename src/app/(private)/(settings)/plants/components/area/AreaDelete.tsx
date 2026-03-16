"use client";
import { Delete } from '@/components/ui/button/buttons';
import { deleteArea } from '@/query/areas/actions';

export default function AreaDelete({ idarea }: { idarea: string }) {
  return (
    <Delete onDelete={() => deleteArea(idarea)} />
  );
}
