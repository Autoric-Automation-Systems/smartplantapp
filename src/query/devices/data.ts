import { sql } from '@vercel/postgres';
import { Device } from '@/query/devices/definitions';
import { CurrentCompanyId } from '@/lib/utils';

export async function fetchDataDevices(idmachine : string) {
  try {
    const data = await sql<Device>`
      SELECT * 
      FROM smartplantapp.devices
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
export async function fetchDataDevicesNoMachine() {
  try {
    const data = await sql<Device>`
      SELECT * 
      FROM smartplantapp.devices
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
        FROM smartplantapp.devices
        WHERE devices.id = ${id} `;

    const device = data.rows;

    return device[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch plant.');
  }
}