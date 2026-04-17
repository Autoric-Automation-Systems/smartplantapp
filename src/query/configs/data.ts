import { sql } from '@/lib/db';
import { Config } from '@/query/configs/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchDataConfigs(device_id: string) {
  try {
    const data = await sql`
      SELECT * 
      FROM public.configs
      WHERE configs.device_id = ${device_id}
      ORDER BY created_at ASC
    `;
    const configs = data;
    //console.log('Fetched configs:', configs);
    return configs as Config[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all configs.');
  }
}

export async function fetchById(id: string) {
  try {
    const data = await sql`
      SELECT *
        FROM public.configs
        WHERE configs.id = ${id} `;

    const config = data[0];

    return config as Config;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch config.');
  }
}