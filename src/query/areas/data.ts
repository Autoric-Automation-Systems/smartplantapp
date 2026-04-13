import { sql } from '@vercel/postgres';
import { Area } from '@/query/areas/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchDataAreas(idplant: string) {
  try {
    const data = await sql<Area>`
      SELECT * 
      FROM public.areas
      WHERE areas.idplant = ${idplant}
      ORDER BY name ASC
    `;
    const areas = data.rows;
    //console.log("Areas: ", areas)
    return areas;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all areas.');
  }
}

export async function fetchFiltered(
  query: string,
  currentPage: number | undefined | null
) {
  const offset = (currentPage && currentPage > 0 ? (currentPage - 1) * ITEMS_PER_PAGE : 0);
  const idplant = await CurrentCompanyId();

  try {
    const data = await sql<Area>`
      SELECT *
      FROM public.areas
      WHERE
        areas.idplant = ${idplant} AND (
        areas.name ILIKE ${`%${query}%`} OR
        areas.id::TEXT ILIKE ${`%${query}%`})
      ORDER BY name ASC
    `;
    const areas = data.rows;
    return areas;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search areas.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchPages(query: string) {
  const idplant = await CurrentCompanyId();
  try {
    const count = await sql`
      SELECT COUNT(*) FROM public.areas
      WHERE areas.idplant = ${idplant}
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
    const data = await sql<Area>`
      SELECT *
        FROM public.areas
        WHERE areas.id = ${id} `;

    const area = data.rows;

    return area[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch area.');
  }
}