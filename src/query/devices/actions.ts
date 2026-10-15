'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { fetchEvents } from '../events/data';
import { assertDeviceInCompany, assertMachineInCompany, guard } from '@/lib/authz';
import { CurrentCompanyId } from '@/lib/utils';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  idmachine: z.string()
});

const UpdateData = FormSchema;

export type State = {
  errors?: {
    id?: string[];
    name?: string[];
    idmachine?: string[];
  };
  message?: string | null;
};

export async function updateData(
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateData.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    idmachine: formData.get('idmachine'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }

  const { id, name, idmachine } = validatedFields.data;
  const idcompany = await CurrentCompanyId();
  await guard('/plants', assertDeviceInCompany(id, idcompany));
  await guard('/plants', assertMachineInCompany(idmachine, idcompany));

  try {

    await sql`
        UPDATE public.devices
        SET idmachine = ${idmachine}, name = ${name}
        WHERE id = ${id}  
      `;
  } catch (error) {
    console.error('Database error:', error);
    return { message: 'Database Error: Failed to Update Device.' };
  }

  revalidatePath('/plants');
  redirect(
    '/plants?title=Sucesso&message=A atualização foi um sucesso!&type=success'
  );
}

export async function deleteDevice(id: string) {
  const idcompany = await CurrentCompanyId();
  await guard('/plants', assertDeviceInCompany(id, idcompany));

  let events = await fetchEvents(id);
  for (const event of events) {
    await sql`DELETE FROM public.events WHERE id = ${event.id}`;
  }

  events = await fetchEvents(id);
  if (events.length === 0) {
    await sql`DELETE FROM public.devices WHERE id = ${id}`;
  }

  revalidatePath('/plants');
  redirect(
    '/plants?title=Sucesso&message=A exclusão foi um sucesso!&type=success'
  );

}