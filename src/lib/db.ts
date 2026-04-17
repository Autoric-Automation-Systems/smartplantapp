import { neon } from '@neondatabase/serverless';
import { unstable_cache } from 'next/cache';

// Configuração otimizada para Neon serverless
const sql = neon(process.env.DATABASE_URL!);

// Tipo para resultados de contagem
interface CountResult {
  count: string;
}

// Função helper para queries com cache
export async function cachedQuery<T>(
  queryFn: () => Promise<T[]>,
  key: string,
  revalidate = 60 // 60 segundos por padrão
): Promise<T[]> {
  return unstable_cache(
    async () => {
      return await queryFn();
    },
    [key],
    { revalidate }
  )();
}
/*
// Função para queries com paginação
export async function paginatedQuery<T>(
  query: string,
  params: any[] = [],
  page = 1,
  limit = 50
): Promise<{ data: T[]; total: number }> {
  const offset = (page - 1) * limit;

  // Query principal com LIMIT/OFFSET
  const dataQuery = `${query} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  const dataParams = [...params, limit, offset];

  // Query de contagem (removendo ORDER BY e LIMIT/OFFSET)
  const countQuery = query
    .replace(/ORDER BY.*?(?=LIMIT|$)/i, '')
    .replace(/LIMIT.*?(?=OFFSET|$)/i, '')
    .replace(/OFFSET.*$/i, '');

  const countQueryFinal = `SELECT COUNT(*) as count FROM (${countQuery}) as count_query`;

  try {
    const [dataResult, countResult] = await Promise.all([
      sql(dataQuery, dataParams) as Promise<T[]>,
      sql(countQueryFinal, params) as Promise<CountResult[]>
    ]);

    // Extrair o count do resultado
    const total = parseInt(countResult[0]?.count || '0');

    return {
      data: dataResult,
      total
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to execute paginated query.');
  }
}

*/

// Função helper para queries simples
export async function query<T = any>(strings: TemplateStringsArray, ...values: any[]): Promise<T[]> {
  return sql(strings, ...values) as Promise<T[]>;
}

// Função helper para query única (primeiro resultado)
export async function queryOne<T = any>(strings: TemplateStringsArray, ...values: any[]): Promise<T | null> {
  const result = await sql(strings, ...values) as T[];
  return result[0] || null;
}

// Exportar o cliente SQL para uso direto quando necessário
export { sql };