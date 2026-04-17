'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  device_id: z.string(),
  count: z.string(),
  event1: z.string(),
  event2: z.string(),
  event3: z.string(),
  event1_on: z.string(),
  event1_off: z.string(),
  event2_on: z.string(),
  event2_off: z.string(),
  event3_on: z.string(),
  event3_off: z.string(),
});

const UpdateData = FormSchema;

export type State = {
  errors?: {
    id?: string[];
    device_id?: string[];
    count?: string[];
    event1?: string[];
    event2?: string[];
    event3?: string[];
    event1_on?: string[];
    event1_off?: string[];
    event2_on?: string[];
    event2_off?: string[];
    event3_on?: string[];
    event3_off?: string[];
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
    device_id: formData.get('device_id'),
    count: formData.get('count'),
    event1: formData.get('event1'),
    event2: formData.get('event2'),
    event3: formData.get('event3'),
    event1_on: formData.get('event1_on'),
    event1_off: formData.get('event1_off'),
    event2_on: formData.get('event2_on'),
    event2_off: formData.get('event2_off'),
    event3_on: formData.get('event3_on'),
    event3_off: formData.get('event3_off'),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }

  const { id, device_id, count, event1, event2, event3, event1_on, event1_off, event2_on, event2_off, event3_on, event3_off } = validatedFields.data;

  try {

    await sql`
        UPDATE public.labels
        SET device_id = ${device_id}, count = ${count}, event1 = ${event1}, event2 = ${event2}, event3 = ${event3}, event1_on = ${event1_on}, event1_off = ${event1_off}, event2_on = ${event2_on}, event2_off = ${event2_off}, event3_on = ${event3_on}, event3_off = ${event3_off}
        WHERE id = ${id}  
      `;
  } catch (error) {
    console.error('Database error:', error);
    return { message: 'Database Error: Failed to Update Label.' };
  }
  revalidatePath('/plants');
  redirect(
    '/plants?title=Sucesso&message=A atualização foi um sucesso!&type=success'
  );
}

export async function deleteLabel(id: string) {

  await sql`DELETE FROM public.labels WHERE id = ${id}`;

  revalidatePath('/plants');
  redirect(
    '/plants?title=Sucesso&message=A exclusão foi um sucesso!&type=success'
  );

}

export async function createLabel(
  device_id: string,
) {

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