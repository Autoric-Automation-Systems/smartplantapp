'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { fetchEvents } from '../events/data';
import { fetchDataDevices } from '../devices/data';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  idarea: z.string()
});

const CreateData = FormSchema.omit({ id: true });
const UpdateData = FormSchema.omit({ id: true, idarea: true });

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createData(prevState: State, formData: FormData) {
  const validatedFields = CreateData.safeParse({
    name: formData.get('name'),
    idarea: formData.get('idarea'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { name, idarea } = validatedFields.data;

  try {
    await sql`
        INSERT INTO public.machines ( name, idarea )
        VALUES (${name}, ${idarea})
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
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }

  const { name } = validatedFields.data;

  try {

    await sql`
        UPDATE public.machines
        SET name = ${name}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Machine.' };
  }
  revalidatePath('/plants');
  redirect(
    '/plants?title=Sucesso&message=A atualização foi um sucesso!&type=success'
  );
}

export async function deleteMachine(id: string) {
  const devicesNumber = (await fetchDataDevices(id)).length;

  if (devicesNumber === 0) {
    await sql`DELETE FROM public.machines WHERE id = ${id}`;
    revalidatePath('/plants');
    redirect(
      '/plants?title=Sucesso&message=A exclusão foi um sucesso!&type=success'
    );

  } else {
    revalidatePath('/plants');
    redirect(
      '/plants?title=Erro&message=A exclusão falhou. A Maquina tem dispositivos associados.&type=error'
    );
  }
}