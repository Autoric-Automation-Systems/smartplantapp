import { sql } from '@vercel/postgres';
import { Label } from '@/query/labels/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchDataLabel(device_id: string) {
  try {
    const data = await sql<Label>`
      SELECT * 
      FROM public.labels
      WHERE labels.device_id = ${device_id}
    `;
    const label = data.rows[0];
    //console.log('Fetched label:', label);
    return label;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch label.');
  }
}

export async function fetchById(id: string) {
  try {
    const data = await sql<Label>`
      SELECT *
        FROM public.labels
        WHERE labels.id = ${id} `;

    const label = data.rows;

    return label[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch plant.');
  }
}