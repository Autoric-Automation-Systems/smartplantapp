import { sql } from '@vercel/postgres';
import { Alarm } from '@/query/alarms/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchDataDeviceAlarms(device_id: string) {
  try {
    const data = await sql<Alarm>`
      SELECT * 
      FROM public.alarms
      WHERE alarms.device_id = ${device_id}
      ORDER BY created_at ASC
    `;
    const alarms = data.rows;
    return alarms;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all alarms.');
  }
}

export async function fetchDataAllAlarms() {
  const currentCompanyId = await CurrentCompanyId();

  try {
    const data = await sql<Alarm>`
      SELECT a.* 
      FROM public.alarms a
      JOIN public.devices d ON a.device_id = d.id
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas ar ON m.idarea = ar.id
      JOIN public.plants p ON ar.idplant = p.id
      WHERE p.idcompany = ${currentCompanyId}
      ORDER BY a.created_at DESC
    `;
    const alarms = data.rows;
    return alarms;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all alarms.');
  }
}


export async function fetchById(id: string) {
  try {
    const data = await sql<Alarm>`
      SELECT *
        FROM public.alarms
        WHERE alarms.id = ${id} 
        LIMIT 1`;


    const alarm = data.rows[0];

    return alarm;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch plant.');
  }
}


export async function fetchRecentAlarms() {
  const currentCompanyId = await CurrentCompanyId();
  try {
    const data = await sql<Alarm>`
            SELECT a.* 
            FROM public.alarms a
            JOIN public.devices d ON a.device_id = d.id
            JOIN public.machines m ON d.idmachine = m.id
            JOIN public.areas ar ON m.idarea = ar.id
            JOIN public.plants p ON ar.idplant = p.id
            WHERE p.idcompany = ${currentCompanyId}
            ORDER BY a.created_at DESC
            LIMIT 10
        `;
    const alarms = data.rows;
    return alarms;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch recent alarms.');
  }
}