import { sql } from '@/lib/db';
import { CurrentCompanyId } from '@/lib/utils';
import { Company } from './definitions';

export async function fetchCompany() {
  try {
    const data = await sql`
      SELECT *
      FROM public.companies
      ORDER BY name ASC
    `;
    const companies = data;
    return companies as Company[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all companies.');
  }
}

export async function fetchFilteredCompany(
  query: string,
  currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT *
      FROM public.companies
      WHERE
        clients.name ILIKE ${`%${query}%`} OR
        clients.cnpj ILIKE ${`%${query}%`} 
      ORDER BY name ASC
    `;
    const companies = data;
    return companies as Company[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchCompanyPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*) FROM public.companies`;

    const totalPages = Math.ceil(Number(count[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

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
    //console.log( 'Company: ' + companies[0]);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch company.');
  }
}
