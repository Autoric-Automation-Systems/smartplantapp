import { sql } from '@vercel/postgres';
import { Plant } from '@/query/plants/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchDataPlants() {
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql<Plant>`
      SELECT * 
      FROM public.plants
      WHERE plants.idcompany = ${idcompany}
      ORDER BY name ASC
    `;
    const plants = data.rows;
    return plants;
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
    const data = await sql<Plant>`
      SELECT *
      FROM public.plants
      WHERE
        plants.idcompany = ${idcompany} AND (
        plants.name ILIKE ${`%${query}%`} OR
        plants.id::TEXT ILIKE ${`%${query}%`})
      ORDER BY name ASC
    `;
    const plants = data.rows;
    return plants;
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

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchById(id: string) {
  try {
    const data = await sql<Plant>`
      SELECT *
        FROM public.plants
        WHERE plants.id = ${id} `;

    const plant = data.rows.map((plant) => ({
      ...plant,
    }));

    return plant[0];
    //console.log('Plant: ' + plant[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch plant.');
  }
}