// Configuración de Firebase para la app móvil
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "FAKE_API_KEY",
  authDomain: "fake-app.firebaseapp.com",
  projectId: "fake-app",
  storageBucket: "fake-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 