import { Platform } from 'react-native';

export const typography = {
  // Tamaños de fuente
  sizes: {
    title: 24,
    subtitle: 18,
    body: 16,
    caption: 14,
    small: 12,
  },

  // Pesos de fuente
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Estilos predefinidos
  styles: {
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: '#000000',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#666666',
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      color: '#000000',
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      color: '#666666',
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: '#666666',
    },
  },

  // Familias de fuente por plataforma
  families: Platform.select({
    ios: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    android: {
      regular: 'Roboto',
      medium: 'Roboto-Medium',
      semibold: 'Roboto-Medium',
      bold: 'Roboto-Bold',
    },
  }),
}; 