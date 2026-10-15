import { sql } from '@/lib/db';

/**
 * Internal helper (not a Server Action) used by the device ingestion route.
 * Keeping it out of the `'use server'` module prevents it from being exposed
 * as a callable endpoint.
 */
export async function insertLabel(device_id: string) {
  const defaut = {
    count: "count",
    event1: "event1",
    event2: "event2",
    event3: "event3",
    event1_on: "ON",
    event1_off: "OFF",
    event2_on: "ON",
    event2_off: "OFF",
    event3_on: "ON",
    event3_off: "OFF"
  };

  try {
    await sql`
        INSERT INTO public.labels (device_id, count, event1, event2, event3, event1_on, event1_off, event2_on, event2_off, event3_on, event3_off)
        VALUES (${device_id}, ${defaut.count}, ${defaut.event1}, ${defaut.event2}, ${defaut.event3}, ${defaut.event1_on}, ${defaut.event1_off}, ${defaut.event2_on}, ${defaut.event2_off}, ${defaut.event3_on}, ${defaut.event3_off})
      `;
  } catch (error) {
    console.error('Database error:', error);
    return { message: 'Database Error: Failed to Create Label.' };
  }
}
