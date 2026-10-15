import { sql } from '@/lib/db';

/**
 * Internal helper (not a Server Action) used by the device ingestion route.
 * Keeping it out of the `'use server'` module prevents it from being exposed
 * as a callable endpoint.
 */
export async function insertConfig(device_id: string, event_name: string) {
  const defaults: Record<string, { min: number; max: number }> = {
    temperature: { min: 15, max: 30 },
    humidity: { min: 50, max: 90 },
    flow: { min: 0, max: 100 },
    count: { min: 0, max: 1000 },
    wifi: { min: -80, max: -50 },
    battery: { min: 20, max: 80 },
  };

  const { min, max } = defaults[event_name] ?? { min: 0, max: 100 };

  try {
    await sql`
        INSERT INTO public.configs (device_id, event_name, min, max)
        VALUES (${device_id}, ${event_name}, ${min}, ${max})
      `;
  } catch (error) {
    console.error('Database error:', error);
    return { message: 'Database Error: Failed to Create Config.' };
  }
}
