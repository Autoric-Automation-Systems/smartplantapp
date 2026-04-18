import { sql } from '@/lib/db';
import { CurrentCompanyId } from '@/lib/optimized-utils';
import { Alarm } from './definitions';

export async function fetchDataDeviceAlarms(device_id: string) {
  try {
    const data = await sql`
      SELECT *
      FROM public.alarms
      WHERE alarms.device_id = ${device_id}
      ORDER BY created_at ASC
    `;
    const alarms = data;
    //console.log('Fetched Alarms:', alarms);
    return alarms as Alarm[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all alarms.');
  }
}

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
    //console.log('Fetched Alarms:', alarms);
    return alarms as Alarm[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all alarms.');
  }
}

export async function fetchAlarmsCount() {
  const currentCompanyId = await CurrentCompanyId();

  try {
    const count = await sql`
      SELECT COUNT(*) as total
            FROM public.alarms a
            JOIN public.devices d ON a.device_id = d.id
            JOIN public.machines m ON d.idmachine = m.id
            JOIN public.areas ar ON m.idarea = ar.id
            JOIN public.plants p ON ar.idplant = p.id
            WHERE p.idcompany = ${currentCompanyId}
        `;
    return parseInt(count[0]?.total || '0');
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch alarms count.');
  }
}


export async function fetchById(id: string) {
  try {
    const data = await sql`
      SELECT id, device_id, message, created_at, readed, event_name
        FROM public.alarms
        WHERE alarms.id = ${id}
        LIMIT 1`;

    const alarm = data[0];

    return alarm as Alarm;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch plant.');
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
