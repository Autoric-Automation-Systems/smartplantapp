'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { assertCompanyIsCurrent, guard } from '@/lib/authz';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const UpdateCompany = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function updateCompany(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateCompany.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Company.',
    };
  }

  const { name } = validatedFields.data;
  await guard('/company', assertCompanyIsCurrent(id));
  try {
    await sql`
    UPDATE public.companies
    SET name = ${name} 
    WHERE id = ${id}
  `;
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Update Company.' };
  }
  revalidatePath('/company');
  redirect(
    '/company?title=Sucesso&message=A atualização foi um sucesso!&type=success'
  );
}
