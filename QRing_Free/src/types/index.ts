// Tipos base
export interface BaseComponentProps {
  style?: any;
  testID?: string;
}

// Tipos de usuario y domicilio
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export interface Domicile {
  id: string;
  userId: string;
  address: string;
  qrCode: string;
  contactPreferences: ContactPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactPreferences {
  allowPhone: boolean;
  allowWhatsApp: boolean;
  availableHours: {
    start: string;
    end: string;
  };
  customMessage?: string;
  blockList: string[]; // Lista de números bloqueados
}

// Tipos para el registro de visitas
export interface Visit {
  id: string;
  domicileId: string;
  timestamp: Date;
  contactMethod: 'phone' | 'whatsapp';
  visitorPhone?: string;
  purpose?: string;
  status: 'pending' | 'completed' | 'missed';
}

// Tipos para estadísticas
export interface DomicileStats {
  totalVisits: number;
  todayVisits: number;
  commonHours: {
    hour: number;
    count: number;
  }[];
  preferredMethod: {
    phone: number;
    whatsapp: number;
  };
}

// Tipos para la configuración
export interface AppConfig {
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    error: string;
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
  qr: {
    size: number;
    errorCorrection: 'L' | 'M' | 'Q' | 'H';
    margin: number;
  };
  communication: {
    maxAttempts: number;
    cooldownPeriod: number; // en minutos
    defaultMessage: string;
  };
} 