import { sql } from '@/lib/db';
import { Label } from '@/query/labels/definitions';

export async function fetchDataLabel(device_id: string) {
  try {
    const data = await sql`
      SELECT * 
      FROM public.labels
      WHERE labels.device_id = ${device_id}
    `;
    const label = data[0];
    return label as Label;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch label.');
  }
}

