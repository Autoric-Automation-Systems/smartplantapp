'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';

const FormSchema = z.object({
  id: z.string(),
  content: z.string(),
  comments: z.string(),
  idmachine: z.string()
});

const CreateData = FormSchema.omit({ id: true });
const UpdateData = FormSchema.omit({ id: true, idmachine: true });

export type State = {
  errors?: {
    content?: string[];
    comments?: string[];
  };
  message?: string | null;
};

export async function createData(prevState: State, formData: FormData) {
  const validatedFields = CreateData.safeParse({
    content: formData.get('content'),
    comments: formData.get('comments'),
    idmachine: formData.get('idmachine'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { content, comments, idmachine } = validatedFields.data;

  try {
    await sql`
        INSERT INTO public.events ( content, comments, idmachine )
        VALUES (${content}, ${comments} , ${idmachine})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create.',
    };
  }

  revalidatePath('/events');
  redirect('/dashboard?success=A criação foi um sucesso!');
}


export async function deleteEvent(id: string) {
  //throw new Error('Failed to Delete Invoice');

  await sql`DELETE FROM public.events WHERE id = ${id}`;
  revalidatePath('/events');
  redirect('/events?success=A exclusão foi realizada!');

}