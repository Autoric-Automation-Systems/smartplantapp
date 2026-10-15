import { sql } from '@/lib/db';
import { CurrentCompanyId } from '@/lib/utils';
import { Alarm } from './definitions';

export async function fetchDataAllAlarms(page = 1, limit = 50) {
  const currentCompanyId = await CurrentCompanyId();
  const offset = (page - 1) * limit;

  try {
    const data = await sql`
      SELECT a.id, a.device_id, a.message, a.created_at, a.readed, a.event_name
      FROM public.alarms a
      JOIN public.devices d ON a.device_id = d.id
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas ar ON m.idarea = ar.id
      JOIN public.plants p ON ar.idplant = p.id
      WHERE p.idcompany = ${currentCompanyId}
      ORDER BY a.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    const alarms = data;
    return alarms as Alarm[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all alarms.');
  }
}

export async function fetchRecentAlarms() {
  const currentCompanyId = await CurrentCompanyId();
  try {
    const data = await sql`
            SELECT a.id, a.device_id, a.message, a.created_at, a.readed, a.event_name
            FROM public.alarms a
            JOIN public.devices d ON a.device_id = d.id
            JOIN public.machines m ON d.idmachine = m.id
            JOIN public.areas ar ON m.idarea = ar.id
            JOIN public.plants p ON ar.idplant = p.id
            WHERE p.idcompany = ${currentCompanyId}
            ORDER BY a.created_at DESC
            LIMIT 10
        `;
    const alarms = data;
    return alarms;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch recent alarms.');
  }
}
