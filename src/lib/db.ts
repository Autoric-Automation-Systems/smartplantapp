import { neon } from '@neondatabase/serverless';

// Configuração otimizada para Neon serverless
const sql = neon(process.env.DATABASE_URL!);

export { sql };
