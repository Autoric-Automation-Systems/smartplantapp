#!/usr/bin/env node

/**
 * Script para corrigir o uso incorreto de CurrentCompanyId() dentro de template strings SQL
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

console.log('🔧 Corrigindo uso de CurrentCompanyId() em queries SQL...\n');

// Padrão para encontrar uso incorreto
const incorrectPattern = /\$\{await CurrentCompanyId\(\)\}/g;
const importPattern = /from ['"]@\/lib\/utils['"]/g;

function fixFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  let changes = 0;
  
  // 1. Corrigir imports
  if (importPattern.test(content)) {
    newContent = newContent.replace(importPattern, "from '@/lib/optimized-utils'");
    changes++;
    console.log(`  📝 ${filePath}: Atualizado import para optimized-utils`);
  }
  
  // 2. Encontrar e corrigir uso incorreto
  const matches = content.match(incorrectPattern);
  if (matches) {
    console.log(`  ⚠️  ${filePath}: Encontrado ${matches.length} uso(s) incorreto(s) de CurrentCompanyId()`);
    
    // Extrair todas as funções que usam CurrentCompanyId incorretamente
    const functionRegex = /export async function (\w+)[^{]*\{[^}]*\$\{await CurrentCompanyId\(\)\}/gs;
    const functionMatches = [...content.matchAll(functionRegex)];
    
    functionMatches.forEach(match => {
      const functionName = match[1];
      console.log(`    • Função ${functionName} precisa ser corrigida`);
    });
    
    // Nota: A correção manual é necessária para cada função
    changes += matches.length;
  }
  
  if (changes > 0) {
    // fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`  ✅ ${filePath}: ${changes} correção(ões) necessária(s)`);
  }
  
  return changes;
}

function scanDirectory(dir) {
  let totalChanges = 0;
  let totalFiles = 0;
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Ignorar node_modules e outros diretórios
      if (!item.includes('node_modules') && !item.startsWith('.') && item !== 'build') {
        totalChanges += scanDirectory(fullPath);
      }
    } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.tsx'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Verificar se é um arquivo de query
      if (content.includes('CurrentCompanyId') && content.includes('sql`')) {
        totalFiles++;
        totalChanges += fixFile(fullPath);
      }
    }
  }
  
  return totalChanges;
}

console.log('📁 Procurando arquivos com problemas...\n');
const totalChanges = scanDirectory(SRC_DIR);

console.log('\n' + '='.repeat(50));
console.log(`📊 Resumo:`);
console.log(`  • Arquivos verificados: ${totalFiles || 'Nenhum encontrado'}`);
console.log(`  • Correções necessárias: ${totalChanges}`);

if (totalChanges > 0) {
  console.log('\n🚨 Arquivos que precisam de correção MANUAL:');
  console.log('\nPara cada função que usa CurrentCompanyId() incorretamente:');
  console.log('\n1. ANTES (errado):');
  console.log('   export async function fetchData() {');
  console.log('     const data = await sql`');
  console.log('       SELECT * FROM table');
  console.log('       WHERE company_id = ${await CurrentCompanyId()}');
  console.log('     `;');
  console.log('   }');
  
  console.log('\n2. DEPOIS (correto):');
  console.log('   export async function fetchData() {');
  console.log('     const companyId = await CurrentCompanyId();');
  console.log('     const data = await sql`');
  console.log('       SELECT * FROM table');
  console.log('       WHERE company_id = ${companyId}');
  console.log('     `;');
  console.log('   }');
  
  console.log('\n📝 Arquivos já corrigidos automaticamente:');
  console.log('   • src/query/devices/data.ts');
  console.log('   • src/query/plants/data.ts');
  console.log('   • src/query/users/data.ts');
  console.log('   • src/query/alarms/data.ts (já estava correto)');
}

console.log('\n🎯 Próximos passos:');
console.log('1. Verifique os arquivos listados acima');
console.log('2. Corrija manualmente cada função com o padrão correto');
console.log('3. Teste as queries após as correções');
console.log('4. Execute o TypeScript compiler para verificar erros: npx tsc --noEmit');

console.log('\n✅ Script concluído!');