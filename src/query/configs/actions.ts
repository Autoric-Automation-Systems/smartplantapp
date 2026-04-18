'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';

const FormSchema = z.object({
  id: z.string(),
  event_name: z.string(),
  device_id: z.string(),
  min: z.number().optional(),
  max: z.number().optional(),
  alarm: z.boolean().optional(),
});

const UpdateData = FormSchema;

export type State = {
  errors?: {
    id?: string[];
    event_name?: string[];
    device_id?: string[];
    min?: string[];
    max?: string[];
  };
  message?: string | null;
};

export async function updateData(
  prevState: State,
  formData: FormData
) {
  //console.log('Received form data:', Object.fromEntries(formData.entries()));

  // Helper function to parse number from form data
  const parseNumber = (value: FormDataEntryValue | null) => {
    if (!value || value === '') return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  };

  const validatedFields = UpdateData.safeParse({
    id: formData.get('id'),
    event_name: formData.get('event_name'),
    device_id: formData.get('device_id'),
    min: parseNumber(formData.get('min')),
    max: parseNumber(formData.get('max')),
    alarm: formData.get('alarm') === 'on' ? true : false,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }

  const { id, event_name, device_id, min, max, alarm } = validatedFields.data;
  //console.log('Validated fields:', { id, device_id, event_name });
  try {

    await sql`
        UPDATE public.configs
        SET device_id = ${device_id}, event_name = ${event_name}, min = ${min}, max = ${max}, alarm = ${alarm}
        WHERE id = ${id}
      `;
  } catch (error) {
    console.error('Database error:', error);
    return { message: 'Database Error: Failed to Update Config.' };
  }
  revalidatePath('/plants');
  redirect(
    '/plants?title=Sucesso&message=A atualização foi um sucesso!&type=success'
  );
}

export async function deleteConfig(id: string) {

  await sql`DELETE FROM public.configs WHERE id = ${id}`;

  revalidatePath('/plants');
  redirect(
    '/plants?title=Sucesso&message=A exclusão foi um sucesso!&type=success'
  );

}

export async function createConfig(
  device_id: string,
  event_name: string,
) {

  const defautTemperatures = {
    min: 15,
    max: 30,
  };
  const defautHumidity = {
    min: 50,
    max: 90,
  };
  const defautFlow = {
    min: 0,
    max: 100,
  };
  const defautCount = {
    min: 0,
    max: 1000,
  };

  let min, max;

  switch (event_name) {
    case 'temperature':
      min = defautTemperatures.min;
      max = defautTemperatures.max;
      break;
    case 'humidity':
      min = defautHumidity.min;
      max = defautHumidity.max;
      break;
    case 'flow':
      min = defautFlow.min;
      max = defautFlow.max;
      break;
    case 'count':
      min = defautCount.min;
      max = defautCount.max;
      break;
    case 'wifi':
      min = -80;
      max = -50;
      break;
    case 'battery':
      min = 20;
      max = 80;
      break;
    default:
      min = 0;
      max = 100
  }

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
