import { sql } from '@/lib/db';
import { User } from '@/query/users/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchData() {
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql`
      SELECT *
      FROM public.users
      WHERE users.idcompany = ${idcompany}
      ORDER BY name ASC
    `;
    const users = data;
    return users as User[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}


export async function fetchByEmail(email: string) {
  try {
    const data = await sql`
      SELECT *
      FROM public.users WHERE users.email = ${email} LIMIT 1
    `;
    const user = data[0];
    return user as User;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to check user by email.');
  }
}