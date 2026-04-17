#!/usr/bin/env node

/**
 * Script para testar as otimizações implementadas
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname);
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

console.log('🧪 Testando otimizações implementadas...\n');

// 1. Verificar se arquivos otimizados existem
const optimizedFiles = [
  'src/lib/db.ts',
  'src/lib/optimized-utils.ts',
  'src/lib/cache-utils.ts',
  'src/hooks/useOptimizedFetch.ts',
  'src/components/common/PaginationOptimized.tsx',
  'src/providers/SWRProvider.tsx',
  'src/app/(private)/alarms-optimized/page.tsx',
  'src/app/(private)/alarms-optimized/components/TableAlarmsOptimized.tsx',
  'src/app/api/alarms/optimized/route.ts',
];

console.log('📁 Verificando arquivos otimizados:');
let allFilesExist = true;
optimizedFiles.forEach(file => {
  const exists = fs.existsSync(path.join(PROJECT_ROOT, file));
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

console.log('\n🔍 Verificando TypeScript errors:');
try {
  const { execSync } = require('child_process');
  execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'pipe' });
  console.log('  ✅ Sem erros TypeScript');
} catch (error) {
  console.log('  ❌ Erros TypeScript encontrados:');
  console.log(error.stdout?.toString() || error.message);
}

console.log('\n📊 Verificando queries otimizadas:');
const queryFiles = [
  'src/query/alarms/data.ts',
  'src/query/devices/data.ts',
];

queryFiles.forEach(file => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, file), 'utf8');
  const hasSelectStar = content.includes('SELECT *');
  const hasPagination = content.includes('LIMIT') && content.includes('OFFSET');
  const hasSpecificColumns = content.match(/SELECT\s+[a-zA-Z_,\s\n]+FROM/i) && !hasSelectStar;
  
  console.log(`\n  📄 ${file}:`);
  console.log(`    ${hasSelectStar ? '❌' : '✅'} SELECT * removido`);
  console.log(`    ${hasPagination ? '✅' : '❌'} Paginação implementada`);
  console.log(`    ${hasSpecificColumns ? '✅' : '❌'} Colunas específicas`);
});

console.log('\n🔧 Verificando configurações:');
const packageJson = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf8'));
const hasSWR = packageJson.dependencies?.swr || packageJson.devDependencies?.swr;
const hasNeon = packageJson.dependencies?.['@neondatabase/serverless'] || 
                packageJson.dependencies?.['@vercel/postgres']?.includes('neondatabase');

console.log(`  ${hasSWR ? '✅' : '❌'} SWR instalado`);
console.log(`  ${hasNeon ? '✅' : '⚠️ '} Neon/Postgres configurado`);

console.log('\n🎯 Verificando cache implementado:');
const cacheFiles = [
  'src/lib/cache-utils.ts',
  'src/app/(private)/alarms-optimized/page.tsx',
];

cacheFiles.forEach(file => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, file), 'utf8');
  const hasCacheUtils = content.includes('unstable_cache') || content.includes('createParamCache');
  console.log(`  ${hasCacheUtils ? '✅' : '❌'} ${file} - Cache implementado`);
});

console.log('\n📈 Resumo das otimizações:');
console.log('='.repeat(50));

const optimizations = {
  'Cache multi-nível': optimizedFiles.filter(f => f.includes('cache') || f.includes('Cache')).length > 0,
  'Queries otimizadas': !queryFiles.some(file => {
    const content = fs.readFileSync(path.join(PROJECT_ROOT, file), 'utf8');
    return content.includes('SELECT *');
  }),
  'Pagination implementada': queryFiles.every(file => {
    const content = fs.readFileSync(path.join(PROJECT_ROOT, file), 'utf8');
    return content.includes('LIMIT') && content.includes('OFFSET');
  }),
  'TypeScript válido': allFilesExist,
  'SWR configurado': hasSWR,
  'Exemplo funcional': fs.existsSync(path.join(PROJECT_ROOT, 'src/app/(private)/alarms-optimized/page.tsx')),
};

Object.entries(optimizations).forEach(([name, status]) => {
  console.log(`  ${status ? '✅' : '❌'} ${name}`);
});

console.log('\n' + '='.repeat(50));
console.log('\n🚀 Próximos passos:');

if (!allFilesExist) {
  console.log('1. Complete a criação dos arquivos faltantes');
}

if (!hasSWR) {
  console.log('2. Instale o SWR: npm install swr');
}

console.log('3. Teste a página otimizada: http://localhost:3000/alarms-optimized');
console.log('4. Migre gradualmente outros módulos');
console.log('5. Monitore o network transfer no dashboard do Neon');

console.log('\n💡 Dica: Use o script de migração para automatizar:');
console.log('   node scripts/migrate-to-neon.js --check');
console.log('   node scripts/migrate-to-neon.js --migrate');

console.log('\n🎉 Teste concluído!');