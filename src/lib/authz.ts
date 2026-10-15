import crypto from 'crypto';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { CurrentCompanyId, CurrentUser } from '@/lib/utils';

/**
 * Raised when the caller is authenticated but not allowed to touch the target row.
 * Never trust tenant ids (idcompany/idplant/idarea/idmachine/device_id) coming from
 * the client: they are always re-derived from the session and verified here.
 */
export class AuthorizationError extends Error {
  constructor(message = 'Not authorized') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

async function assertOwned(
  query: Promise<Record<string, unknown>[]>,
  entity: string
): Promise<void> {
  const rows = await query;
  if (rows.length === 0) {
    throw new AuthorizationError(`${entity} not found for the current company`);
  }
}

export function isAdminRole(role: string | undefined): boolean {
  return role === 'admin' || role === 'dev';
}

/**
 * Runs an ownership check inside a Server Action and redirects back with the
 * app's standard error banner when the caller is not allowed to proceed.
 */
export async function guard(
  returnPath: string,
  check: Promise<void>
): Promise<void> {
  try {
    await check;
  } catch (error) {
    if (error instanceof AuthorizationError) {
      redirect(
        `${returnPath}?title=Erro&message=${encodeURIComponent(
          'Operação não permitida para o seu usuário.'
        )}&type=error`
      );
    }
    throw error;
  }
}

/** Resolves the role the caller is allowed to persist on a user row. */
export async function resolveRoleForWrite(
  submittedRole: string | undefined,
  fallbackRole: string
): Promise<string> {
  const user = await CurrentUser();
  if (user && isAdminRole(user.role)) {
    return submittedRole ?? fallbackRole;
  }
  return fallbackRole;
}

export async function assertCompanyIsCurrent(idcompany: string): Promise<void> {
  const current = await CurrentCompanyId();
  if (!current || current !== idcompany) {
    throw new AuthorizationError('Company mismatch');
  }
}

export async function assertPlantInCompany(
  idplant: string,
  idcompany: string
): Promise<void> {
  await assertOwned(
    sql`SELECT 1 FROM public.plants WHERE id = ${idplant} AND idcompany = ${idcompany}`,
    'Plant'
  );
}

export async function assertAreaInCompany(
  idarea: string,
  idcompany: string
): Promise<void> {
  await assertOwned(
    sql`
      SELECT 1
      FROM public.areas a
      JOIN public.plants p ON a.idplant = p.id
      WHERE a.id = ${idarea} AND p.idcompany = ${idcompany}
    `,
    'Area'
  );
}

export async function assertMachineInCompany(
  idmachine: string,
  idcompany: string
): Promise<void> {
  await assertOwned(
    sql`
      SELECT 1
      FROM public.machines m
      JOIN public.areas a ON m.idarea = a.id
      JOIN public.plants p ON a.idplant = p.id
      WHERE m.id = ${idmachine} AND p.idcompany = ${idcompany}
    `,
    'Machine'
  );
}

/**
 * A device already attached to a machine must belong to the caller's company.
 * Devices without a machine are the unassigned pool used by the "add device"
 * flow; the schema has no owner for them, so they stay claimable.
 */
export async function assertDeviceInCompany(
  iddevice: string,
  idcompany: string
): Promise<void> {
  await assertOwned(
    sql`
      SELECT 1
      FROM public.devices d
      LEFT JOIN public.machines m ON d.idmachine = m.id
      LEFT JOIN public.areas a ON m.idarea = a.id
      LEFT JOIN public.plants p ON a.idplant = p.id
      WHERE d.id = ${iddevice}
        AND (d.idmachine IS NULL OR p.idcompany = ${idcompany})
    `,
    'Device'
  );
}

export async function assertConfigInCompany(
  idconfig: string,
  idcompany: string
): Promise<void> {
  await assertOwned(
    sql`
      SELECT 1
      FROM public.configs c
      JOIN public.devices d ON c.device_id = d.id
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas a ON m.idarea = a.id
      JOIN public.plants p ON a.idplant = p.id
      WHERE c.id = ${idconfig} AND p.idcompany = ${idcompany}
    `,
    'Config'
  );
}

export async function assertLabelInCompany(
  idlabel: string,
  idcompany: string
): Promise<void> {
  await assertOwned(
    sql`
      SELECT 1
      FROM public.labels l
      JOIN public.devices d ON l.device_id = d.id
      JOIN public.machines m ON d.idmachine = m.id
      JOIN public.areas a ON m.idarea = a.id
      JOIN public.plants p ON a.idplant = p.id
      WHERE l.id = ${idlabel} AND p.idcompany = ${idcompany}
    `,
    'Label'
  );
}

export async function assertUserInCompany(
  iduser: string,
  idcompany: string
): Promise<void> {  await assertOwned(
    sql`SELECT 1 FROM public.users WHERE id = ${iduser} AND idcompany = ${idcompany}`,
    'User'
  );
}

/** Marks an alarm as read only when it belongs to the caller's company. */
export async function markAlarmAsRead(
  idalarm: string,
  idcompany: string
): Promise<number> {
  const updated = await sql`
    UPDATE public.alarms a
    SET readed = true
    FROM public.devices d
    JOIN public.machines m ON d.idmachine = m.id
    JOIN public.areas ar ON m.idarea = ar.id
    JOIN public.plants p ON ar.idplant = p.id
    WHERE a.id = ${idalarm}
      AND a.device_id = d.id
      AND p.idcompany = ${idcompany}
    RETURNING a.id
  `;
  return updated.length;
}

/**
 * Shared-secret gate for the device (hardware) ingestion endpoints, which cannot
 * present a user session. It stays disabled until DEVICE_API_KEY is configured, so
 * existing devices keep working.
 */
export function isDeviceRequestAuthorized(request: Request): boolean {  const expected = process.env.DEVICE_API_KEY;
  if (!expected) return true;

  const provided =
    request.headers.get('x-api-key') ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!provided) return false;

  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);
  if (expectedBuffer.length !== providedBuffer.length) return false;

  return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
}
