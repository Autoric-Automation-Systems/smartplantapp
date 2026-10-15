import { cache } from 'react';
import { redirect } from 'next/navigation';
import { auth } from './auth';
import { fetchByEmail } from '@/query/users/data';
import { fetchCompanyById } from '@/query/companies/data';

/**
 * Single source of truth for the authenticated caller.
 * All helpers are memoized per request with React `cache`.
 */

export const CurrentUser = cache(async () => {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/signin');
  }
  return await fetchByEmail(session.user.email);
});

export const CurrentCompanyId = cache(async () => {
  const user = await CurrentUser();
  if (!user?.idcompany) {
    throw new Error('User company ID is not available.');
  }
  return user.idcompany;
});

export const CurrentCompany = cache(async () => {
  const idcompany = await CurrentCompanyId();
  return await fetchCompanyById(idcompany);
});
