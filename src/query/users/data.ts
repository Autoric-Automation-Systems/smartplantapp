import { sql } from '@vercel/postgres';
import { User } from '@/query/users/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchData() {
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql<User>`
      SELECT * 
      FROM public.users
      WHERE users.idcompany = ${idcompany}
      ORDER BY name ASC
    `;
    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}

export async function fetchFiltered(
  query: string,
  currentPage: number | undefined | null
) {
  const offset = (currentPage && currentPage > 0 ? (currentPage - 1) * ITEMS_PER_PAGE : 0);
  const idcompany = await CurrentCompanyId();

  try {
    const data = await sql<User>`
      SELECT *
      FROM public.users
      WHERE
        users.idcompany = ${idcompany} AND (
        users.name ILIKE ${`%${query}%`} OR
        users.role ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`} OR
        users.id::TEXT ILIKE ${`%${query}%`})
      ORDER BY name ASC
    `;
    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search users.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchPages(query: string) {
  const idcompany = await CurrentCompanyId();
  try {
    const count = await sql`
      SELECT COUNT(*) FROM public.users
      WHERE users.idcompany = ${idcompany}
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
    const data = await sql<User>`
      SELECT *
        FROM public.users
        WHERE users.id = ${id} `;

    const user = data.rows;
    //console.log('User: ' + user[0]);

    return user[0];
  } catch (error) {
    console.log(error);
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchByEmail(email: string): Promise<User> {
  try {
    const data = await sql<User>`
      SELECT * FROM public.users WHERE users.email = ${email} LIMIT 1
    `;
    const user = data.rows[0];
    //console.log('User by email: ' + user.lastname);
    return user;
  } catch (error) {
    console.log(error);
    console.error('Database Error:', error);
    throw new Error('Failed to check user by email.');
  }
}