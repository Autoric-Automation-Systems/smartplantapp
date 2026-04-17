'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { deleteUnusedFiles } from '@/lib/deleteUnusedFiles';
import { Company } from './definitions';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const CreateCompany = FormSchema.omit({ id: true });
const UpdateCompany = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createCompany(prevState: State, formData: FormData) {
  const validatedFields = CreateCompany.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { name } = validatedFields.data;

  try {
    await sql`
        INSERT INTO public.companies ( name )
        VALUES (${name})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create.',
    };
  }
  revalidatePath('/company');
  redirect(
    '/company?title=Sucesso&message=A criação foi um sucesso!&type=success'
  );
}

export async function updateCompany(
  id: string,
  prevState: State,
  formData: FormData
) {
  //console.log('Form Data: ' + FormData.arguments );
  const validatedFields = UpdateCompany.safeParse({
    name: formData.get('name'),
  });
  //console.log('Validates: ' + validatedFields.data?.logourl );

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Company.',
    };
  }

  const { name } = validatedFields.data;
  try {
    await sql`
    UPDATE public.companies
    SET name = ${name} 
    WHERE id = ${id}
  `;
  } catch (error) {
    console.log(error);
    return { message: 'Database Error: Failed to Update Company.' };
  }
  //deleteUnusedFiles();
  revalidatePath('/company');
  redirect(
    '/company?title=Sucesso&message=A atualização foi um sucesso!&type=success'
  );
}

export async function deleteCompany(id: string) {
  //throw new Error('Failed to Delete Invoice');

  await sql`DELETE FROM public.companies WHERE id = ${id}`;
  revalidatePath('/company');
  redirect(
    '/company?title=Sucesso&message=A exclusão foi um sucesso!&type=success'
  );
}