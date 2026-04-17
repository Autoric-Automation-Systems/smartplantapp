import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { CurrentCompanyId } from '@/lib/optimized-utils';
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Validar parâmetros
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      );
    }

    const companyId = await CurrentCompanyId();
    const offset = (page - 1) * limit;

    // Buscar dados e contagem em paralelo
    const [data, countResult] = await Promise.all([
      sql`
        SELECT a.id, a.device_id, a.message, a.created_at, a.readed
        FROM public.alarms a
        JOIN public.devices d ON a.device_id = d.id
        JOIN public.machines m ON d.idmachine = m.id
        JOIN public.areas ar ON m.idarea = ar.id
        JOIN public.plants p ON ar.idplant = p.id
        WHERE p.idcompany = ${companyId}
        ORDER BY a.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      sql`
        SELECT COUNT(*) as total
        FROM public.alarms a
        JOIN public.devices d ON a.device_id = d.id
        JOIN public.machines m ON d.idmachine = m.id
        JOIN public.areas ar ON m.idarea = ar.id
        JOIN public.plants p ON ar.idplant = p.id
        WHERE p.idcompany = ${companyId}
      `
    ]);

    const total = parseInt((countResult as any)[0]?.total || '0');

    const result = {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };

    // Headers para cache HTTP (5 minutos no CDN)
    const headers = {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      'CDN-Cache-Control': 'public, s-maxage=300',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=300',
    };

    return NextResponse.json(result, { headers });

  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch alarms' },
      { status: 500 }
    );
  }
}

// Configuração da rota
export const dynamic = 'force-dynamic'; // Para dados dinâmicos
