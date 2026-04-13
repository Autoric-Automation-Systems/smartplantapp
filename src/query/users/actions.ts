'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { deleteUnusedFiles } from '@/lib/deleteUnusedFiles';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastname: z.string(),
  email: z.string().optional(),
  password: z.string(),
  avatarurl: z.string().optional(),
  role: z.string(),
  idcompany: z.string()
});

const CreateData = FormSchema.omit({ id: true });
const UpdateData = FormSchema.omit({ id: true, idcompany: true });

export type State = {
  errors?: {
    name?: string[];
    lastname?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createData(prevState: State, formData: FormData) {
  //console.log('FormData:', Object.fromEntries(formData.entries()));
  const validatedFields = CreateData.safeParse({
    name: formData.get('name'),
    lastname: formData.get('lastname'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
    idcompany: formData.get('idcompany'),
    avatarurl: formData.get('avatarurl'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const { name, lastname, email, password, role, idcompany, avatarurl } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
        INSERT INTO public.users ( name, lastname, email, password, role, idcompany, avatarurl )
        VALUES (${name}, ${lastname}, ${email}, ${hashedPassword}, ${role}, ${idcompany}, ${avatarurl})
        `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create.',
    };
  }

  revalidatePath('/settings/users');
  redirect(
    '/users?title=Sucesso&message=A criação foi um sucesso!&type=success'
  );
}

export async function updateData(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateData.safeParse({
    name: formData.get('name'),
    lastname: formData.get('lastname'),
    password: formData.get('password'),
    role: formData.get('role'),
    avatarurl: formData.get('avatarurl'),
  });


  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }


  const { name, password, role, avatarurl } = validatedFields.data;
  //const hashedPassword = await bcrypt.hash(password, 10);

  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      //console.log('Senha' + password);
      //console.log('Senha Criptografada' + hashedPassword);

      await sql`
        UPDATE public.users
        SET name = ${name}, lastname = ${validatedFields.data.lastname}, password = ${hashedPassword}, role = ${role}, avatarurl = ${avatarurl}
        WHERE id = ${id}
      `;
    } else {
      //console.log(password);

      await sql`
        UPDATE public.users
        SET name = ${name}, lastname = ${validatedFields.data.lastname}, role = ${role}, avatarurl = ${avatarurl}
        WHERE id = ${id}
      `;
    }
  } catch (error) {
    return { message: 'Database Error: Failed to Update User.' };
  }
  deleteUnusedFiles();
  revalidatePath('/users');
  redirect(
    '/users?title=Sucesso&message=A atualização foi um sucesso!&type=success'
  );
}

export async function updateUserPassword(id: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
    UPDATE public.users 
    SET password = ${hashedPassword} 
    WHERE id = ${id}
  `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update User.' };
  }
}

export async function deleteData(id: string) {
  //throw new Error('Failed to Delete Invoice');

  await sql`DELETE FROM public.users WHERE id = ${id}`;
  revalidatePath('/settings/users');
  redirect(
    '/users?title=Sucesso&message=A exclusão foi um sucesso!&type=success'
  );

}