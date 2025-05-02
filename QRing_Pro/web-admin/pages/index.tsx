import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

interface Timbre {
  id: string;
  nombre: string;
  usuario: string;
}

export default function Dashboard() {
  const [timbres, setTimbres] = useState<Timbre[]>([]);
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [editando, setEditando] = useState<string | null>(null);

  const cargarTimbres = async () => {
    const querySnapshot = await getDocs(collection(db, 'timbres'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Timbre[];
    setTimbres(data);
  };

  useEffect(() => {
    cargarTimbres();
  }, []);

  const handleAgregar = async () => {
    if (!nombre || !usuario) return;
    await addDoc(collection(db, 'timbres'), { nombre, usuario });
    setNombre('');
    setUsuario('');
    cargarTimbres();
  };

  const handleEditar = (timbre: Timbre) => {
    setEditando(timbre.id);
    setNombre(timbre.nombre);
    setUsuario(timbre.usuario);
  };

  const handleGuardar = async () => {
    if (!nombre || !usuario || !editando) return;
    await updateDoc(doc(db, 'timbres', editando), { nombre, usuario });
    setEditando(null);
    setNombre('');
    setUsuario('');
    cargarTimbres();
  };

  const handleBorrar = async (id: string) => {
    await deleteDoc(doc(db, 'timbres', id));
    cargarTimbres();
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Panel de Administración QRing Pro</h1>
      <h2>Timbres</h2>
      <ul>
        {timbres.map((t) => (
          <li key={t.id} style={{ marginBottom: 10 }}>
            <b>{t.nombre}</b> - Usuario: {t.usuario}
            <button onClick={() => handleEditar(t)} style={{ marginLeft: 10 }}>Editar</button>
            <button onClick={() => handleBorrar(t.id)} style={{ marginLeft: 5, color: 'red' }}>Borrar</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nombre del timbre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="text"
        placeholder="Usuario asignado"
        value={usuario}
        onChange={e => setUsuario(e.target.value)}
        style={{ marginRight: 10 }}
      />
      {editando ? (
        <button onClick={handleGuardar}>Guardar cambios</button>
      ) : (
        <button onClick={handleAgregar}>Agregar timbre</button>
      )}
    </div>
  );
}
