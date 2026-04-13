import { sql } from '@vercel/postgres';
import { Machine } from '@/query/machines/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchDataMachines(idarea: string) {
  try {
    const data = await sql<Machine>`
      SELECT * 
      FROM public.machines
      WHERE machines.idarea = ${idarea}
      ORDER BY name ASC
    `;
    const machines = data.rows;
    return machines;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all machines.');
  }
}

export async function fetchFiltered(
  query: string,
  currentPage: number | undefined | null
) {
  const offset = (currentPage && currentPage > 0 ? (currentPage - 1) * ITEMS_PER_PAGE : 0);
  const idarea = await CurrentCompanyId();

  try {
    const data = await sql<Machine>`
      SELECT *
      FROM public.machines
      WHERE
        machines.idarea = ${idarea} AND (
        machines.name ILIKE ${`%${query}%`} OR
        machines.id::TEXT ILIKE ${`%${query}%`})
      ORDER BY name ASC
    `;
    const machines = data.rows;
    return machines;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search machines.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchPages(query: string) {
  const idarea = await CurrentCompanyId();
  try {
    const count = await sql`
      SELECT COUNT(*) FROM public.machines
      WHERE machines.idarea = ${idarea}
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
    const data = await sql<Machine>`
      SELECT *
        FROM public.machines
        WHERE machines.id = ${id} `;

    const machine = data.rows;

    return machine[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch plant.');
  }
}