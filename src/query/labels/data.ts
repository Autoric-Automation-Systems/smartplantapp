import { sql } from '@/lib/db';
import { Label } from '@/query/labels/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchDataLabel(device_id: string) {
  try {
    const data = await sql`
      SELECT * 
      FROM public.labels
      WHERE labels.device_id = ${device_id}
    `;
    const label = data[0];
    //console.log('Fetched label:', label);
    return label as Label;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch label.');
  }
}

export async function fetchById(id: string) {
  try {
    const data = await sql`
      SELECT *
        FROM public.labels
        WHERE labels.id = ${id}
        LIMIT 1 
      `;


    const label = data[0];

    return label as Label;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch label.');
  }
}