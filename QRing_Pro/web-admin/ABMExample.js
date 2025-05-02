import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Alta
export async function crearUsuario(usuario) {
  const docRef = await addDoc(collection(db, 'usuarios'), usuario);
  return docRef.id;
}

// Baja
export async function borrarUsuario(id) {
  await deleteDoc(doc(db, 'usuarios', id));
}

// Modificación
export async function modificarUsuario(id, nuevosDatos) {
  await updateDoc(doc(db, 'usuarios', id), nuevosDatos);
}

// Lectura
export async function obtenerUsuarios() {
  const querySnapshot = await getDocs(collection(db, 'usuarios'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
} 