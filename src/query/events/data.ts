import { sql } from '@/lib/db';
import { Event } from '@/query/events/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchEvents(idmachine: string) {
  const idcompany = await CurrentCompanyId();
  try {
    const data = await sql`
      SELECT *
      FROM (
        SELECT 
          e.*,
          ROW_NUMBER() OVER (
            PARTITION BY e.name 
            ORDER BY e.created_at DESC
          ) as rn
        FROM public.events e
        JOIN public.devices d 
          ON d.id = e.device_id
        JOIN public.machines m
          ON d.idmachine = m.id
        JOIN public.areas a
          ON m.idarea = a.id
        JOIN public.plants p
          ON a.idplant = p.id
        WHERE d.idmachine = ${idmachine}
          AND p.idcompany = ${idcompany}
      ) t
      WHERE rn <= 100
      ORDER BY created_at DESC
    `;
    const events = data;
    return events as Event[];
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch events.");
  }
}

export async function fetchEventsDevice(id: string) {
  try {
    const data = await sql`
    SELECT * 
    FROM public.events
    WHERE device_id = ${id}
    ORDER BY created_at DESC
    LIMIT 10000
  `;
    const events = data;
    return events as Event[];

  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch events.");
  }
}

