import { sql } from '@vercel/postgres';
import { Config } from '@/query/configs/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchDataConfigs(device_id: string) {
  try {
    const data = await sql<Config>`
      SELECT * 
      FROM public.configs
      WHERE configs.device_id = ${device_id}
      ORDER BY created_at ASC
    `;
    const configs = data.rows;
    //console.log('Fetched configs:', configs);
    return configs;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all configs.');
  }
}

export async function fetchById(id: string) {
  try {
    const data = await sql<Config>`
      SELECT *
        FROM public.configs
        WHERE configs.id = ${id} `;

    const config = data.rows;

    return config[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch plant.');
  }
}