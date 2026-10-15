import { sql } from '@/lib/db';

import { Company } from './definitions';

const ITEMS_PER_PAGE = 6;

export async function fetchCompanyById(id: string) {
  try {
    const data = await sql`
      SELECT *
        FROM public.companies
        WHERE companies.id = ${id} `;

    const companies = data.map((company) => ({
      ...company,
    }));

    return companies[0] as Company;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch company.');
  }
}
