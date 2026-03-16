"use client";
import { Delete } from '@/components/ui/button/buttons';
import { deleteData } from '@/query/plants/actions';

export default function PlantDelete({ idplant }: { idplant: string }) {
  return (
    <Delete onDelete={() => deleteData(idplant)} />
  );
}
