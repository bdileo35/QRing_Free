const fs = require('fs');
const path = require('path');

// Estructura base del proyecto
const projectStructure = {
  src: {
    components: {
      common: {},
      layout: {},
      forms: {},
    },
    screens: {
      auth: {},
      main: {},
      help: {},
    },
    navigation: {},
    constants: {},
    types: {},
    utils: {},
    services: {
      api: {},
      storage: {},
    },
    hooks: {},
    context: {},
  },
  assets: {
    images: {},
    fonts: {},
    icons: {},
  },
  scripts: {},
};

// Crear estructura de directorios
function createDirectoryStructure(basePath, structure) {
  Object.entries(structure).forEach(([dir, subDirs]) => {
    const currentPath = path.join(basePath, dir);
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath, { recursive: true });
      console.log(`✅ Creado directorio: ${currentPath}`);
    }
    if (Object.keys(subDirs).length > 0) {
      createDirectoryStructure(currentPath, subDirs);
    }
  });
}

// Crear archivo README.md con instrucciones
function createReadme() {
  const readmeContent = `# QRing 2.0

## Estructura del Proyecto
\`\`\`
src/
├── components/     # Componentes reutilizables
│   ├── common/    # Componentes básicos (Button, Input, etc.)
│   ├── layout/    # Componentes de diseño (Header, Container, etc.)
│   └── forms/     # Componentes de formularios
├── screens/       # Pantallas de la aplicación
│   ├── auth/      # Pantallas de autenticación
│   ├── main/      # Pantallas principales
│   └── help/      # Pantallas de ayuda
├── navigation/    # Configuración de navegación
├── constants/     # Constantes y configuración
├── types/         # Tipos de TypeScript
├── utils/         # Funciones utilitarias
├── services/      # Servicios (API, almacenamiento, etc.)
├── hooks/         # Hooks personalizados
└── context/       # Contextos de React
\`\`\`

## Scripts Disponibles

- \`npm start\`: Inicia el servidor de desarrollo
- \`npm run build\`: Construye la aplicación para producción
- \`npm test\`: Ejecuta las pruebas
- \`npm run lint\`: Ejecuta el linter
- \`npm run format\`: Formatea el código

## Convenciones de Código

1. **Nombrado de archivos:**
   - Componentes: PascalCase (ej: Button.tsx)
   - Utilidades: camelCase (ej: formatDate.ts)
   - Constantes: SNAKE_CASE (ej: API_ENDPOINTS.ts)

2. **Imports:**
   - Imports absolutos desde 'src/'
   - Agrupar imports por tipo (React, Componentes, Utilidades)

3. **Componentes:**
   - Un componente por archivo
   - Usar TypeScript interfaces para props
   - Documentar props complejas

4. **Estilos:**
   - Usar StyleSheet.create()
   - Nombres descriptivos para los estilos
   - Evitar estilos en línea

## Flujo de Trabajo Git

1. Crear rama feature: \`git checkout -b feature/nombre-feature\`
2. Commits descriptivos: \`git commit -m "feat: descripción"\`
3. Push a rama: \`git push origin feature/nombre-feature\`
4. Crear Pull Request
5. Merge después de revisión

## Configuración del Entorno

1. Instalar dependencias: \`npm install\`
2. Copiar .env.example a .env
3. Configurar variables de entorno
4. Ejecutar \`npm start\`

## Mantenimiento

- Actualizar dependencias regularmente
- Revisar y resolver warnings
- Mantener documentación actualizada
- Realizar backups periódicos
`;

  fs.writeFileSync(path.join(process.cwd(), 'README.md'), readmeContent);
  console.log('✅ README.md creado/actualizado');
}

// Actualizar package.json con scripts útiles
function updatePackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = require(packageJsonPath);

  const newScripts = {
    ...packageJson.scripts,
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "lint": "eslint \"src/**/*.{ts,tsx}\" --fix",
    "test": "jest",
    "clean": "rm -rf node_modules && npm install",
    "type-check": "tsc --noEmit",
    "prepare": "husky install"
  };

  packageJson.scripts = newScripts;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ package.json actualizado');
}

// Ejecutar configuración
console.log('🚀 Iniciando configuración del proyecto...');
createDirectoryStructure(process.cwd(), projectStructure);
createReadme();
updatePackageJson();
console.log('✅ Configuración completada!'); 