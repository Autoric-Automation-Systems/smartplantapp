'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { deleteUnusedFiles } from '@/lib/deleteUnusedFiles';
import {
  assertUserInCompany,
  guard,
  isAdminRole,
  resolveRoleForWrite,
} from '@/lib/authz';
import { CurrentCompanyId, CurrentUser } from '@/lib/utils';

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastname: z.string(),
  email: z.string().optional(),
  password: z.string(),
  avatarurl: z.string().optional(),
  role: z.string().optional(),
  idcompany: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
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
  const validatedFields = CreateData.safeParse({
    name: formData.get('name'),
    lastname: formData.get('lastname'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
    avatarurl: formData.get('avatarurl'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create.',
    };
  }
  const {
    name,
    lastname,
    email,
    password,
    role: submittedRole,
    avatarurl,
  } = validatedFields.data;
  // The company comes from the session; the role only changes when an admin submits it.
  const idcompany = await CurrentCompanyId();
  const role = await resolveRoleForWrite(submittedRole, 'user');
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
    bio: formData.get('bio'),
    phone: formData.get('phone'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update.',
    };
  }

  const {
    name,
    password,
    role: submittedRole,
    avatarurl,
    bio,
    phone,
  } = validatedFields.data;
  const idcompany = await CurrentCompanyId();
  await guard('/users', assertUserInCompany(id, idcompany));

  const current = await sql`
    SELECT role FROM public.users WHERE id = ${id} AND idcompany = ${idcompany}
  `;
  const role = await resolveRoleForWrite(
    submittedRole,
    (current[0]?.role as string) ?? 'user'
  );
  // A senha só pode ser trocada pelo próprio usuário ou por um administrador.
  const caller = await CurrentUser();
  const canChangePassword = caller?.id === id || isAdminRole(caller?.role);
  const newPassword = canChangePassword ? password : '';

  try {
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await sql`
        UPDATE public.users
        SET name = ${name}, lastname = ${validatedFields.data.lastname}, password = ${hashedPassword}, role = ${role}, avatarurl = ${avatarurl}, bio = ${bio}, phone = ${phone}
        WHERE id = ${id} AND idcompany = ${idcompany}
      `;
    } else {

      await sql`
        UPDATE public.users
        SET name = ${name}, lastname = ${validatedFields.data.lastname}, role = ${role}, avatarurl = ${avatarurl}, bio = ${bio}, phone = ${phone}
        WHERE id = ${id} AND idcompany = ${idcompany}
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

export async function deleteData(id: string) {
  const idcompany = await CurrentCompanyId();
  await guard('/users', assertUserInCompany(id, idcompany));

  await sql`DELETE FROM public.users WHERE id = ${id} AND idcompany = ${idcompany}`;
  revalidatePath('/settings/users');
  redirect(
    '/users?title=Sucesso&message=A exclusão foi um sucesso!&type=success'
  );

}