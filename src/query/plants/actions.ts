'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { fetchDataAreas } from '../areas/data';
import { assertPlantInCompany, guard } from '@/lib/authz';
import { CurrentCompanyId } from '@/lib/utils';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  idcompany: z.string()
});

const CreateData = FormSchema.omit({ id: true, idcompany: true });
const UpdateData = FormSchema.omit({ id: true, idcompany: true });

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createData(prevState: State, formData: FormData) {
  const validatedFields = CreateData.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { name } = validatedFields.data;
  // The owning company always comes from the session, never from the form.
  const idcompany = await CurrentCompanyId();

  try {
    await sql`
        INSERT INTO public.plants ( name, idcompany )
        VALUES (${name}, ${idcompany})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create.',
    };
  }

  revalidatePath('/plants');
  redirect(
    '/plants?title=Sucesso&message=A criação foi um sucesso!&type=success'
  );
}

export async function updateData(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateData.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }

  const { name } = validatedFields.data;
  const idcompany = await CurrentCompanyId();
  await guard('/plants', assertPlantInCompany(id, idcompany));

  try {

    await sql`
        UPDATE public.plants
        SET name = ${name}
        WHERE id = ${id} AND idcompany = ${idcompany}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Plant.' };
  }
  revalidatePath('/plants');
  redirect(
    '/plants?title=Sucesso&message=A atualização foi um sucesso!&type=success'
  );
}

export async function deleteData(id: string) {
  const idcompany = await CurrentCompanyId();
  await guard('/plants', assertPlantInCompany(id, idcompany));

  const areasNumber = (await fetchDataAreas(id)).length;
  if (areasNumber === 0) {
    await sql`DELETE FROM public.plants WHERE id = ${id} AND idcompany = ${idcompany}`;
    revalidatePath('/plants');
    redirect(
      '/plants?title=Sucesso&message=A exclusão foi um sucesso!&type=success'
    );
  } else {
    revalidatePath('/plants');
    redirect(
      '/plants?title=Erro&message=A exclusão falhou. A planta tem áreas associadas.&type=error'
    );
  }
}