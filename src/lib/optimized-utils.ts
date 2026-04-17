import { fetchCompanyById } from '../query/companies/data';
import { fetchByEmail } from '../query/users/data';
import crypto from "crypto";
import { redirect } from 'next/navigation';
import { auth } from './auth';
import { cache } from 'react';

// Cache por request usando React cache
export const getCurrentCompanyId = cache(async () => {
  const session = await auth();
  if (!session) {
    redirect('/signin');
    return null; 
  }
  if (!session || !session.user || !session.user.email) {
    throw new Error('User session is not available.');
  }
  const user = await fetchByEmail(session.user.email);
  const idcompany = user.idcompany;
  if (!idcompany) {
    throw new Error('User company ID is not available.');
  }
  return idcompany;
});

// Cache para dados da empresa
export const getCurrentCompany = cache(async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    throw new Error('User session is not available.');
  }
  const user = await fetchByEmail(session.user.email);
  if (!user.idcompany) {
    throw new Error('User company ID is not available.');
  }
  const company = await fetchCompanyById(user.idcompany);
  return company;
});

// Cache para dados do usuário
export const getCurrentUser = cache(async () => {
  const session = await auth();
  if (!session || !session?.user || !session.user.email) {
    throw new Error('User session is not available.');
  }
  const user = await fetchByEmail(session?.user?.email);
  return user;
});

export async function CurrentCompanyId() {
  return await getCurrentCompanyId();
}

export async function CurrentCompany() {
  return await getCurrentCompany();
}

export async function CurrentUser() {
  return await getCurrentUser();
}

// Funções de formatação (mantidas do arquivo original)
export const formatCurrency = (amount: number) => {
  const newamount = amount.toLocaleString(
    'pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  );
  return newamount;
};

export const formatCPF = (cpf: string | null | undefined) => {
  if (!cpf) {
    return '';
  }
  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return cpf;
};

export const formatCNPJ = (cnpj: string | null | undefined) => {
  if (!cnpj) {
    return '';
  }
  cnpj = cnpj.replace(/\D/g, '');
  cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
  cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
  return cnpj;
};

export const formatCEP = (cep: string | null | undefined) => {
  if (!cep) {
    return '';
  }
  cep = cep.replace(/\D/g, '');
  cep = cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  return cep;
};

export const formatPhone = (phone: string | null | undefined) => {
  if (!phone) {
    return '';
  }
  phone = phone.replace(/\D/g, '');
  if (phone.length <= 10) {
    phone = phone.replace(/(\d{2})(\d)/, '($1) $2');
    phone = phone.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    phone = phone.replace(/(\d{2})(\d)/, '($1) $2');
    phone = phone.replace(/(\d{5})(\d)/, '$1-$2');
  }
  return phone;
};

export const formatCurrencyInput = (value: string) => {
  value = value.replace(/\D/g, '');
  const formattedValue = (parseInt(value) / 100).toFixed(2).replace('.', ',');
  return formattedValue;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const generateToken = () => crypto.randomBytes(32).toString("hex");