// Teste simples de conexão com o banco
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log('🔍 Testando conexão com o banco...');
    
    // Verificar se DATABASE_URL está configurada
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL não encontrada no .env.local');
      return;
    }
    
    console.log('✅ DATABASE_URL configurada');
    console.log('📦 Usando @vercel/postgres...');
    
    const { sql } = require('@vercel/postgres');
    
    // Teste simples
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Conexão bem-sucedida!');
    console.log(`⏰ Hora do servidor: ${result.rows[0].current_time}`);
    
    // Testar CurrentCompanyId (simulado)
    console.log('\n🔍 Testando CurrentCompanyId...');
    console.log('⚠️  Nota: Este teste requer autenticação, testando apenas a função');
    
    try {
      const { CurrentCompanyId } = require('./src/lib/optimized-utils');
      console.log('✅ Função CurrentCompanyId carregada');
    } catch (error) {
      console.error('❌ Erro ao carregar CurrentCompanyId:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Erro de conexão:', error.message);
    console.error('Detalhes:', error);
  }
}

testConnection();