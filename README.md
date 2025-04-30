# QRing Workspace

## 📱 Descripción
QRing es una suite de aplicaciones para la gestión de timbres inteligentes, desarrollada con React Native + Expo. El workspace contiene diferentes versiones del producto adaptadas a distintas necesidades.

## 🌟 Versiones

### QRing Basic
Template base para todas las versiones. Contiene la estructura fundamental y componentes base.

### QRing Free
Versión gratuita con funcionalidades básicas:
- Generación de QR para WhatsApp
- Configuración de timbre
- Exportación de etiqueta

### QRing Call
Versión con funcionalidades adicionales:
- Todo lo incluido en Free
- Llamadas directas
- Historial de interacciones

## 🛠 Estructura del Workspace

```
QRing_Workspace/
├── shared/               # Código compartido entre versiones
│   ├── components/      # Componentes UI reutilizables
│   ├── theme/          # Sistema de temas y estilos
│   ├── hooks/          # Hooks personalizados
│   ├── utils/          # Utilidades comunes
│   └── types/          # Definiciones de TypeScript
├── QRing_Basic/         # Template base
├── QRing_Free/          # Versión gratuita
└── QRing_Call/          # Versión con llamadas
```

## 🎨 Diseño UI
- Cards con bordes redondeados y sombras suaves
- Botones con estados y feedback visual
- Inputs validados y con feedback
- Navegación intuitiva
- Tema consistente entre versiones

## 🎯 Objetivos Actuales
1. Migración de componentes a shared/
2. Implementación de sistema de temas
3. Optimización de generación QR
4. Mejora en manejo de estados
5. Testing y documentación

## 🚀 Comenzar

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el proyecto:
```bash
npx expo start
```

## 📝 Convenciones
- TypeScript para todo el código
- Componentes funcionales con hooks
- Styled-components para estilos
- Jest para testing
- ESLint + Prettier para formato

## 📦 Dependencias Principales
- React Native
- Expo
- React Navigation
- TypeScript
- Styled Components

## 🤝 Contribución
1. Crear branch desde develop
2. Implementar cambios
3. Crear PR a develop
4. Code review
5. Merge a develop

## 📄 Licencia
Propiedad de QRing. Todos los derechos reservados.
