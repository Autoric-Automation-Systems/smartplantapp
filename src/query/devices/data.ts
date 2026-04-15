import { sql } from '@vercel/postgres';
import { Device } from '@/query/devices/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchDataDevices(idmachine: string) {
  try {
    const data = await sql<Device>`
      SELECT * 
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

export async function fetchDataAllDevices() {
  try {
    const data = await sql<Device>`
      SELECT d.* 
      FROM public.devices d
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas a ON m.idarea = a.id
      JOIN public.plants p ON a.idplant = p.id
      WHERE p.idcompany = ${await CurrentCompanyId()}
      ORDER BY created_at ASC 
    `;
    const devices = data.rows;
    //console.log(devices);
    return devices;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all devices.');
  }
}

export async function fetchDataDevicesNoMachine() {
  try {
    const data = await sql<Device>`
      SELECT * 
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
      SELECT *
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