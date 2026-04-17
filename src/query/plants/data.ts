import { sql } from '@/lib/db';
import { Plant } from '@/query/plants/definitions';
import { CurrentCompanyId } from '@/lib/optimized-utils';
export async function fetchDataPlants() {
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql`
      SELECT id, name, idcompany
      FROM public.plants
      ORDER BY name ASC
    `;
    const plants = data;
    return plants as Plant[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all plants.');
  }
}

export async function fetchFiltered(
  query: string,
  currentPage: number | undefined | null
) {
  const offset = (currentPage && currentPage > 0 ? (currentPage - 1) * ITEMS_PER_PAGE : 0);
  const idcompany = await CurrentCompanyId();

  try {
    const data = await sql`
      SELECT id, name, idcompany
      FROM public.plants
      WHERE
        plants.name ILIKE ${`%${query}%`} OR
        plants.id::TEXT ILIKE ${`%${query}%`})
      ORDER BY name ASC
    `;
    const plants = data;
    return plants as Plant[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search plants.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchPages(query: string) {
  const idcompany = await CurrentCompanyId();
  try {
    const count = await sql`
      SELECT COUNT(*) FROM public.plants
      WHERE plants.idcompany = ${idcompany}
    `;

    const totalPages = Math.ceil(Number(count[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchById(id: string) {
  try {
    const data = await sql`
      SELECT id, name, idcompany
        FROM public.plants
        WHERE plants.id = ${id} `;
    const plant = data[0];
    return plant as Plant;
  }
  catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch plant by ID.');
  }
}
