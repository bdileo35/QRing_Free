import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Share } from 'react-native';
import Header from '../components/Header';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { QRGenerator } from '../components/common/QRGenerator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Config: undefined;
  Main: {
    screen: string;
  };
};

export default function ConfigScreen() {
  const [showInLabel, setShowInLabel] = useState(true);
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [apartment, setApartment] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isValidPhone = phone.replace(/[^\d]/g, '').length >= 10;

  const handleSave = async () => {
    try {
      // Formatear la dirección completa
      const fullAddress = `${street} ${number}${floor ? ` Piso ${floor}` : ''}${apartment ? ` Dpto ${apartment}` : ''}`.trim();
      
      // Crear el objeto de configuración
      const configData = {
        phone: phone.replace(/[^\d]/g, ''),
        formattedPhone: phone,
        address: {
          street,
          number,
          floor,
          apartment,
          showInLabel,
          fullAddress
        },
        qrCode: `https://wa.me/549${phone.replace(/[^\d]/g, '')}`
      };

      // Guardar en AsyncStorage
      await AsyncStorage.setItem('@qring_config', JSON.stringify(configData));
      
      Alert.alert(
        "¡Éxito!",
        "Configuración guardada correctamente",
        [
          { 
            text: "OK",
            onPress: () => {
              // Navegar al tab navigator y luego a Inicio
              navigation.navigate('Main', { screen: 'Inicio' });
            }
          }
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error saving config:', error);
      Alert.alert(
        "Error",
        "No se pudo guardar la configuración",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  const handleClear = () => {
    setPhone('');
    setStreet('');
    setNumber('');
    setFloor('');
    setApartment('');
    setShowInLabel(true);
  };

  return (
    <View style={styles.root}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Configuración</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Número de WhatsApp"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Dirección</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={showInLabel ? 'checked' : 'unchecked'}
              onPress={() => setShowInLabel(!showInLabel)}
            />
            <Text style={styles.checkboxLabel}>Mostrar en la etiqueta</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Calle"
            value={street}
            onChangeText={setStreet}
          />

          <View style={styles.rowContainer}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Número"
              value={number}
              onChangeText={setNumber}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Piso"
              value={floor}
              onChangeText={setFloor}
              keyboardType="numeric"
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Departamento"
            value={apartment}
            onChangeText={setApartment}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <Icon name="eraser" size={24} color="#007AFF" />
            <Text style={styles.buttonText}>Limpiar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, !isValidPhone && styles.buttonDisabled]} 
            onPress={handleSave}
            disabled={!isValidPhone}
          >
            <Icon name="content-save" size={24} color={isValidPhone ? "#007AFF" : "#B0B0B0"} />
            <Text style={[styles.buttonText, !isValidPhone && styles.buttonTextDisabled]}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  addressContainer: {
    marginTop: 20,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  buttonTextDisabled: {
    color: '#B0B0B0',
  },
}); 