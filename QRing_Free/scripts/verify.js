const fs = require('fs');
const path = require('path');

const expectedFiles = [
  'src/components/layout/Header.tsx',
  'src/components/layout/ScreenContainer.tsx',
  'src/components/layout/HistoryContainer.tsx',
  'src/components/common/Button.tsx',
  'src/components/common/HelpCarousel.tsx',
  'src/components/index.ts',
  'src/constants/theme.ts',
  'src/types/index.ts',
];

const expectedDirs = [
  'src/components/common',
  'src/components/layout',
  'src/components/forms',
  'src/screens/auth',
  'src/screens/main',
  'src/screens/help',
  'src/navigation',
  'src/constants',
  'src/types',
  'src/utils',
  'src/services/api',
  'src/services/storage',
  'src/hooks',
  'src/context',
];

console.log('🔍 Verificando estructura del proyecto...\n');

// Verificar directorios
console.log('📁 Verificando directorios:');
expectedDirs.forEach(dir => {
  const exists = fs.existsSync(path.join(process.cwd(), dir));
  console.log(`${exists ? '✅' : '❌'} ${dir}`);
});

console.log('\n📄 Verificando archivos:');
expectedFiles.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Verificar package.json
const packageJson = require(path.join(process.cwd(), 'package.json'));
console.log('\n📦 Verificando scripts en package.json:');
const expectedScripts = ['start', 'format', 'lint', 'test', 'clean', 'type-check'];
expectedScripts.forEach(script => {
  console.log(`${packageJson.scripts[script] ? '✅' : '❌'} ${script}`);
}); 