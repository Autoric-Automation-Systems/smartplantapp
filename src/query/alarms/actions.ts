'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { fetchEvents } from '../events/data';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  idmachine: z.string(),
  event_name: z.string()
});

const UpdateData = FormSchema;

export type State = {
  errors?: {
    id?: string[];
    event_name?: string[];
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
    event_name: formData.get('event_name'),
    idmachine: formData.get('idmachine'),
  });

  if (!validatedFields.success) {
    //console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }

  const { id, event_name, idmachine } = validatedFields.data;
  //console.log('Validated fields:', { id, idmachine, name });

  try {

    await sql`
        UPDATE public.alarmss
        SET idmachine = ${idmachine}, event_name = ${event_name}
        WHERE id = ${id}  
      `;
  } catch (error) {
    console.error('Database error:', error);
    return { message: 'Database Error: Failed to Update Alarms.' };
  }
  revalidatePath('/plants');
  redirect(
    '/plants?title=Sucesso&message=A atualização foi um sucesso!&type=success'
  );
}

export async function deletealarms(id: string) {

  await sql`DELETE FROM public.alarmss WHERE id = ${id}`;

  revalidatePath('/plants');
  redirect(
    '/plants?title=Sucesso&message=A exclusão foi um sucesso!&type=success'
  );

}