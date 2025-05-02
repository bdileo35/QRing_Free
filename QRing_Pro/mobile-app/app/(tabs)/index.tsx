import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { crearUsuario, obtenerUsuarios, borrarUsuario, modificarUsuario } from '../../ABMExample';

// Definir el tipo de usuario
interface Usuario {
  id: string;
  nombre: string;
  email: string;
}

export default function HomeScreen() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [editando, setEditando] = useState<string | null>(null);

  const cargarUsuarios = async () => {
    const data = await obtenerUsuarios();
    setUsuarios(data as Usuario[]);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleAgregar = async () => {
    if (!nombre || !email) return;
    await crearUsuario({ nombre, email });
    setNombre('');
    setEmail('');
    cargarUsuarios();
  };

  const handleEditar = (usuario: Usuario) => {
    setEditando(usuario.id);
    setNombre(usuario.nombre);
    setEmail(usuario.email);
  };

  const handleGuardar = async () => {
    if (!nombre || !email || !editando) return;
    await modificarUsuario(editando, { nombre, email });
    setEditando(null);
    setNombre('');
    setEmail('');
    cargarUsuarios();
  };

  const handleBorrar = async (id: string) => {
    Alert.alert('Confirmar', '¿Seguro que quieres borrar este usuario?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Borrar', style: 'destructive', onPress: async () => {
        await borrarUsuario(id);
        cargarUsuarios();
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.usuario}>
            <Text>{item.nombre} ({item.email})</Text>
            <View style={styles.botones}>
              <Button title="Editar" onPress={() => handleEditar(item)} />
              <Button title="Borrar" color="red" onPress={() => handleBorrar(item.id)} />
            </View>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {editando ? (
        <Button title="Guardar cambios" onPress={handleGuardar} />
      ) : (
        <Button title="Agregar usuario" onPress={handleAgregar} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  usuario: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  botones: { flexDirection: 'row', gap: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginBottom: 10 },
});
