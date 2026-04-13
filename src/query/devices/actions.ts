'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { fetchEvents } from '../events/data';

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
  //console.log('Received form data:', Object.fromEntries(formData.entries()));
  const validatedFields = UpdateData.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    idmachine: formData.get('idmachine'),
  });

  if (!validatedFields.success) {
    //console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }

  const { id, name, idmachine } = validatedFields.data;
  //console.log('Validated fields:', { id, idmachine, name });

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