'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { assertConfigInCompany, assertDeviceInCompany, guard } from '@/lib/authz';
import { CurrentCompanyId } from '@/lib/utils';

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
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }

  const { id, event_name, device_id, min, max, alarm } = validatedFields.data;
  const idcompany = await CurrentCompanyId();
  await guard('/plants', assertConfigInCompany(id, idcompany));
  await guard('/plants', assertDeviceInCompany(device_id, idcompany));
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

