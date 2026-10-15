import { sql } from '@/lib/db';
import { Area } from '@/query/areas/definitions';

export async function fetchDataAreas(idplant: string) {
  try {
    const data = await sql`
      SELECT * 
      FROM public.areas
      WHERE areas.idplant = ${idplant}
      ORDER BY name ASC
    `;
    const areas = data;
    return areas as Area[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all areas.');
  }
}

