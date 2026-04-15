'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  device_id: z.string(),
  min: z.number().optional(),
  max: z.number().optional(),
});

const UpdateData = FormSchema;

export type State = {
  errors?: {
    id?: string[];
    name?: string[];
    device_id?: string[];
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
    device_id: formData.get('device_id'),
    min: formData.get('min') ? Number(formData.get('min')) : undefined,
    max: formData.get('max') ? Number(formData.get('max')) : undefined,
  });

  if (!validatedFields.success) {
    //console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }

  const { id, name, device_id, min, max } = validatedFields.data;
  //console.log('Validated fields:', { id, device_id, name });

  try {

    await sql`
        UPDATE public.configs
        SET device_id = ${device_id}, name = ${name}, min = ${min}, max = ${max}
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