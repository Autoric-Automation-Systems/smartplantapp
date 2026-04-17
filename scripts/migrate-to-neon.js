#!/usr/bin/env node

/**
 * Script para migração gradual de @vercel/postgres para @neondatabase/serverless
 * 
 * Uso:
 * 1. node scripts/migrate-to-neon.js --check
 * 2. node scripts/migrate-to-neon.js --migrate
 * 3. node scripts/migrate-to-neon.js --rollback
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.join(__dirname, '..');
const QUERIES_DIR = path.join(PROJECT_ROOT, 'src', 'query');
const LIB_DIR = path.join(PROJECT_ROOT, 'src', 'lib');
const API_DIR = path.join(PROJECT_ROOT, 'src', 'app', 'api');

// Padrões para encontrar imports
const IMPORT_PATTERNS = {
  vercelPostgres: /import\s+{[^}]*\bsql\b[^}]*}\s+from\s+['"]@vercel\/postgres['"]/g,
  neonServerless: /import\s+{[^}]*\bneon\b[^}]*}\s+from\s+['"]@neondatabase\/serverless['"]/g,
  sqlFromVercel: /\b(sql)\s+from\s+['"]@vercel\/postgres['"]/,
};

// Template para o novo arquivo db.ts
const DB_TEMPLATE = `import { neon } from '@neondatabase/serverless';
import { unstable_cache } from 'next/cache';

// Configuração otimizada para Neon serverless
const sql = neon(process.env.DATABASE_URL!);

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

// Função para queries com paginação
export async function paginatedQuery<T>(
  query: string,
  params: any[] = [],
  page = 1,
  limit = 50
): Promise<{ data: T[]; total: number }> {
  const offset = (page - 1) * limit;
  
  // Query principal com LIMIT/OFFSET
  const dataQuery = \`\${query} LIMIT \$\${params.length + 1} OFFSET \$\${params.length + 2}\`;
  const dataParams = [...params, limit, offset];
  
  // Query de contagem (removendo ORDER BY e LIMIT/OFFSET)
  const countQuery = query
    .replace(/ORDER BY.*?(?=LIMIT|\$)/i, '')
    .replace(/LIMIT.*?(?=OFFSET|\$)/i, '')
    .replace(/OFFSET.*\$/i, '');
  
  const countQueryFinal = \`SELECT COUNT(*) FROM (\${countQuery}) as count_query\`;
  
  try {
    const [dataResult, countResult] = await Promise.all([
      sql(dataQuery, dataParams) as Promise<T[]>,
      sql(countQueryFinal, params) as Promise<{ count: string }[]>
    ]);
    
    return {
      data: dataResult,
      total: parseInt(countResult[0]?.count || '0')
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to execute paginated query.');
  }
}

// Exportar o cliente SQL para uso direto quando necessário
export { sql };
`;

function findFilesWithPattern(directory, pattern) {
  const files = [];
  
  function scanDir(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Ignorar node_modules e outros diretórios
        if (!item.includes('node_modules') && !item.startsWith('.') && item !== 'build') {
          scanDir(fullPath);
        }
      } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.tsx'))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (pattern.test(content)) {
          files.push({
            path: fullPath,
            content,
            relativePath: path.relative(PROJECT_ROOT, fullPath)
          });
        }
      }
    }
  }
  
  scanDir(directory);
  return files;
}

function checkCurrentUsage() {
  console.log('🔍 Verificando uso atual de @vercel/postgres...\n');
  
  const vercelFiles = findFilesWithPattern(PROJECT_ROOT, IMPORT_PATTERNS.vercelPostgres);
  const neonFiles = findFilesWithPattern(PROJECT_ROOT, IMPORT_PATTERNS.neonServerless);
  
  console.log(`📊 Estatísticas:`);
  console.log(`   • Arquivos usando @vercel/postgres: ${vercelFiles.length}`);
  console.log(`   • Arquivos usando @neondatabase/serverless: ${neonFiles.length}`);
  
  if (vercelFiles.length > 0) {
    console.log('\n📁 Arquivos que precisam ser migrados:');
    vercelFiles.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file.relativePath}`);
    });
  }
  
  return { vercelFiles, neonFiles };
}

function migrateFile(file) {
  console.log(`🔄 Migrando: ${file.relativePath}`);
  
  let newContent = file.content;
  
  // Substituir import
  newContent = newContent.replace(
    /import\s+{[^}]*\bsql\b[^}]*}\s+from\s+['"]@vercel\/postgres['"]/,
    `import { sql } from '@/lib/db'`
  );
  
  // Escrever arquivo atualizado
  fs.writeFileSync(file.path, newContent, 'utf8');
  console.log(`   ✅ Migrado com sucesso`);
}

function createDbFile() {
  const dbFilePath = path.join(LIB_DIR, 'db.ts');
  
  if (!fs.existsSync(dbFilePath)) {
    console.log('📄 Criando arquivo db.ts otimizado...');
    fs.writeFileSync(dbFilePath, DB_TEMPLATE, 'utf8');
    console.log('   ✅ Arquivo db.ts criado');
  } else {
    console.log('📄 Arquivo db.ts já existe');
  }
}

function updatePackageJson() {
  const packagePath = path.join(PROJECT_ROOT, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  // Remover @vercel/postgres das dependências
  if (packageJson.dependencies['@vercel/postgres']) {
    delete packageJson.dependencies['@vercel/postgres'];
    console.log('📦 Removendo @vercel/postgres do package.json...');
  }
  
  // Adicionar @neondatabase/serverless se não existir
  if (!packageJson.dependencies['@neondatabase/serverless']) {
    packageJson.dependencies['@neondatabase/serverless'] = '^0.9.5';
    console.log('📦 Adicionando @neondatabase/serverless ao package.json...');
  }
  
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
  console.log('   ✅ package.json atualizado');
}

function runMigration() {
  console.log('🚀 Iniciando migração para @neondatabase/serverless...\n');
  
  const { vercelFiles } = checkCurrentUsage();
  
  if (vercelFiles.length === 0) {
    console.log('✅ Nenhum arquivo para migrar!');
    return;
  }
  
  // 1. Criar arquivo db.ts
  createDbFile();
  
  // 2. Migrar arquivos
  console.log('\n🔄 Migrando arquivos...');
  vercelFiles.forEach(migrateFile);
  
  // 3. Atualizar package.json
  console.log('\n📦 Atualizando dependências...');
  updatePackageJson();
  
  console.log('\n🎉 Migração concluída!');
  console.log('\n📝 Próximos passos:');
  console.log('   1. Execute: npm install');
  console.log('   2. Teste a aplicação localmente');
  console.log('   3. Verifique se todas as queries funcionam corretamente');
  console.log('   4. Faça deploy para produção');
}

function rollbackMigration() {
  console.log('↩️  Iniciando rollback para @vercel/postgres...\n');
  
  // Implementar rollback se necessário
  console.log('⚠️  Rollback não implementado completamente.');
  console.log('   Para voltar, reinstale @vercel/postgres e reverta os imports manualmente.');
}

// Processar argumentos
const args = process.argv.slice(2);

if (args.includes('--check')) {
  checkCurrentUsage();
} else if (args.includes('--migrate')) {
  runMigration();
} else if (args.includes('--rollback')) {
  rollbackMigration();
} else {
  console.log('Uso:');
  console.log('  node scripts/migrate-to-neon.js --check     Verificar uso atual');
  console.log('  node scripts/migrate-to-neon.js --migrate   Executar migração');
  console.log('  node scripts/migrate-to-neon.js --rollback  Reverter migração');
}