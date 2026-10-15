import { sql } from '@/lib/db';
import { Config } from '@/query/configs/definitions';

export async function fetchDataConfigs(device_id: string) {
  try {
    const data = await sql`
      SELECT * 
      FROM public.configs
      WHERE configs.device_id = ${device_id}
      ORDER BY created_at ASC
    `;
    const configs = data;
    return configs as Config[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all configs.');
  }
}

