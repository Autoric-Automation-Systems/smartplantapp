import { sql } from '@vercel/postgres';
import { Device } from '@/query/devices/definitions';
import { CurrentCompanyId } from '@/lib/optimized-utils';

export async function fetchDataDevices(idmachine: string) {
  try {
    const data = await sql<Device>`
      SELECT id, name, idmachine, created_at, lastheartbeat, type
      FROM public.devices
      WHERE devices.idmachine = ${idmachine}
      ORDER BY created_at ASC
    `;
    const devices = data.rows;
    return devices;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all devices.');
  }
}

export async function fetchDataAllDevices(page = 1, limit = 100) {
  const offset = (page - 1) * limit;

  try {
    // Obter o companyId ANTES de usar na query
    const companyId = await CurrentCompanyId();

    const data = await sql<Device>`
      SELECT d.id, d.name, d.idmachine, d.created_at
      FROM public.devices d
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas a ON m.idarea = a.id
      JOIN public.plants p ON a.idplant = p.id
      WHERE p.idcompany = ${companyId}
      ORDER BY created_at ASC 
      LIMIT ${limit} OFFSET ${offset}
    `;
    const devices = data.rows;
    return devices;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all devices.');
  }
}

export async function fetchDevicesCount() {
  try {
    // Obter o companyId ANTES de usar na query
    const companyId = await CurrentCompanyId();

    const count = await sql`
      SELECT COUNT(*) as total
      FROM public.devices d
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas a ON m.idarea = a.id
      JOIN public.plants p ON a.idplant = p.id
      WHERE p.idcompany = ${companyId}
    `;
    return parseInt(count.rows[0]?.total || '0');
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch devices count.');
  }
}

export async function fetchDataDevicesNoMachine() {
  try {
    const data = await sql<Device>`
      SELECT id, name, idmachine, created_at, type
        FROM public.devices
      WHERE devices.idmachine IS NULL
      ORDER BY created_at ASC
    `;
    const devices = data.rows;
    return devices;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all devices.');
  }
}

export async function fetchById(id: string) {
  try {
    const data = await sql<Device>`
      SELECT id, name, idmachine, created_at
        FROM public.devices
        WHERE devices.id = ${id} `;

    const device = data.rows[0];
    //console.log('Fetched Device:', device);
    return device;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch plant.');
  }
}
