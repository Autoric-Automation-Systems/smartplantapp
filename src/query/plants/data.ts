import { sql } from '@/lib/db';
import { Plant } from '@/query/plants/definitions';
import { CurrentCompanyId } from '@/lib/utils';
export async function fetchDataPlants() {
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql`
      SELECT id, name, idcompany
      FROM public.plants
      WHERE idcompany = ${idcompany}
      ORDER BY name ASC
    `;
    const plants = data;
    return plants as Plant[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all plants.');
  }
}

