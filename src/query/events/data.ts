import { sql } from '@/lib/db';
import { Event } from '@/query/events/definitions';
import { CurrentCompanyId } from '@/lib/utils';
import { fetchDataDevices } from '../devices/data';

export async function fetchEvents(idmachine: string) {
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
        WHERE d.idmachine = ${idmachine}
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
    //console.log(data.rows.length);
    const events = data;
    return events as Event[];

  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch events.");
  }
}

export async function fetchFiltered(
  query: string,
  currentPage: number | undefined | null
) {
  const offset = (currentPage && currentPage > 0 ? (currentPage - 1) * ITEMS_PER_PAGE : 0);
  const idmachine = await CurrentCompanyId();

  try {
    const data = await sql`
      SELECT *
      FROM public.events
      WHERE
        events.idmachine = ${idmachine} AND (
        events.id::TEXT ILIKE ${`%${query}%`})
      ORDER BY name ASC

    `;
    const events = data;
    return events as Event[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to search events.');
  }
}
const ITEMS_PER_PAGE = 6;

export async function fetchPages(query: string) {
  const idmachine = await CurrentCompanyId();
  try {
    const count = await sql`
      SELECT COUNT(*) FROM public.events
      WHERE events.idmachine = ${idmachine}
    `;

    const totalPages = Math.ceil(Number(count[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number.');
  }
}

export async function fetchById(id: string) {
  try {
    const data = await sql`
      SELECT *
        FROM public.events
        WHERE events.id = ${id} `;

    const event = data[0];

    return event as Event;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch event.');
  }
}