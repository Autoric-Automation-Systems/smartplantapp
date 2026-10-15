import { sql } from '@/lib/db';
import { Machine } from '@/query/machines/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchDataMachines(idarea: string) {
  try {
    const data = await sql`
      SELECT * 
      FROM public.machines
      WHERE machines.idarea = ${idarea}
      ORDER BY name ASC
    `;
    const machines = data;
    return machines as Machine[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all machines.');
  }
}


export async function fetchById(id: string) {
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql`
      SELECT m.*
        FROM public.machines m
        JOIN public.areas a ON m.idarea = a.id
        JOIN public.plants p ON a.idplant = p.id
        WHERE m.id = ${id} AND p.idcompany = ${idcompany} `;

    const machine = data[0];

    return machine as Machine;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch machine.');
  }
}
