import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Share } from 'react-native';
import Header from '../components/Header';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { QRGenerator } from '../components/common/QRGenerator';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AddressData {
  street: string;
  number: string;
  floor: string;
  apartment: string;
}

export default function ConfigScreen() {
  const [showInLabel, setShowInLabel] = useState(true);
  const [phone, setPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  
  // Estado separado para cada campo de dirección
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [apartment, setApartment] = useState('');

  const validatePhone = (text: string) => {
    // Formato: 11 1234-5678
    const phoneRegex = /^(\d{2}\s?\d{4}-?\d{4})$/;
    return phoneRegex.test(text.replace(/\s/g, ''));
  };

  const formatPhoneNumber = (text: string) => {
    // Eliminar todo excepto números
    const numbers = text.replace(/[^\d]/g, '');
    
    // Formatear según la longitud
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 2)} ${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)} ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  };

  const handlePhoneChange = (text: string) => {
    // Limitar a 10 dígitos (11 2222-3333)
    const numbersOnly = text.replace(/[^\d]/g, '');
    if (numbersOnly.length <= 10) {
      const formattedPhone = formatPhoneNumber(text);
      setPhone(formattedPhone);
    }
  };

  useEffect(() => {
    const isValid = validatePhone(phone);
    setIsValidPhone(isValid);
  }, [phone]);

  const handleClear = () => {
    setPhone('');
    setStreet('');
    setNumber('');
    setFloor('');
    setApartment('');
    setShowInLabel(true);
  };

  const handleSave = async () => {
    try {
      const configData = {
        phone: phone.replace(/[^\d]/g, ''),
        showInLabel,
        address: {
          street,
          number,
          floor,
          apartment
        }
      };
      await AsyncStorage.setItem('@qring_config', JSON.stringify(configData));
      Alert.alert(
        "¡Éxito!",
        "Configuración guardada correctamente",
        [{ text: "OK" }],
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

  const handleShare = async () => {
    try {
      const addressText = showInLabel && street ? 
        `\nDirección: ${street} ${number}${floor ? `, Piso ${floor}` : ''}${apartment ? `, Dpto ${apartment}` : ''}` : '';
      
      const message = `¡Hola! Este es mi timbre digital QRing.\nWhatsApp: ${phone}${addressText}`;
      
      await Share.share({
        message,
        title: 'Compartir QRing'
      });
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert(
        "Error",
        "No se pudo compartir la configuración",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  const handleNumberChange = (text: string) => {
    // Solo permitir números
    const numbersOnly = text.replace(/[^\d]/g, '');
    setNumber(numbersOnly);
  };

  const handleFloorChange = (text: string) => {
    // Solo permitir números
    const numbersOnly = text.replace(/[^\d]/g, '');
    setFloor(numbersOnly);
  };

  return (
    <View style={styles.root}>
      <Header />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Configuración del Timbre</Text>
        
        <View style={styles.qrContainer}>
          <QRGenerator 
            value={isValidPhone ? `https://wa.me/549${phone.replace(/[^\d]/g, '')}` : 'invalid'} 
            size={220}
          />
          {!isValidPhone && (
            <View style={styles.qrOverlay} />
          )}
        </View>
        
        <View style={styles.groupWrapper}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>WhatsApp</Text>
          </View>
          <View style={styles.groupContainer}>
            <TextInput
              style={[
                styles.inputPhone,
                !isValidPhone && phone.length > 0 && styles.inputError
              ]}
              value={phone}
              onChangeText={handlePhoneChange}
              placeholder="11 2222-3333"
              placeholderTextColor="#B0B0B0"
              keyboardType="phone-pad"
              maxLength={12}
            />
          </View>
        </View>

        <View style={styles.groupWrapper}>
          <View style={styles.labelWrapper}>
            <View style={styles.directionRow}>
              <Text style={[styles.label, { marginRight: 8 }]}>Dirección</Text>
              <Checkbox.Android
                status={showInLabel ? 'checked' : 'unchecked'}
                onPress={() => setShowInLabel(!showInLabel)}
                color="#007AFF"
              />
              <Text style={styles.checkLabel}>Mostrar en la etiqueta</Text>
            </View>
          </View>
          <View style={[styles.groupContainer, styles.addressGroupContainer]}>
            <View style={styles.addressContent}>
              <View style={styles.addressInputsContainer}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, styles.sublabel]}>Calle</Text>
                  <TextInput
                    style={styles.inputAddress}
                    value={street}
                    onChangeText={setStreet}
                    placeholder="Nombre de la calle"
                    placeholderTextColor="#B0B0B0"
                  />
                </View>
                <View style={styles.rowInputs}>
                  <View style={styles.inputGroupHalf}>
                    <Text style={[styles.label, styles.sublabel]}>Altura</Text>
                    <TextInput
                      style={styles.inputSmall}
                      value={number}
                      onChangeText={handleNumberChange}
                      placeholder="123"
                      placeholderTextColor="#B0B0B0"
                      keyboardType="number-pad"
                      maxLength={5}
                    />
                  </View>
                  <View style={[styles.inputGroupHalf, { flexDirection: 'row', gap: 8 }]}>
                    <View style={styles.inputGroupQuarter}>
                      <Text style={[styles.label, styles.sublabel]}>Piso</Text>
                      <TextInput
                        style={styles.inputTiny}
                        value={floor}
                        onChangeText={handleFloorChange}
                        placeholder="1"
                        placeholderTextColor="#B0B0B0"
                        keyboardType="number-pad"
                        maxLength={2}
                      />
                    </View>
                    <View style={styles.inputGroupQuarter}>
                      <Text style={[styles.label, styles.sublabel]}>Dpto</Text>
                      <TextInput
                        style={styles.inputTiny}
                        value={apartment}
                        onChangeText={setApartment}
                        placeholder="A"
                        placeholderTextColor="#B0B0B0"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
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
          <TouchableOpacity 
            style={[styles.button, !isValidPhone && styles.buttonDisabled]}
            onPress={handleShare}
            disabled={!isValidPhone}
          >
            <Icon name="share-variant" size={24} color={isValidPhone ? "#007AFF" : "#B0B0B0"} />
            <Text style={[styles.buttonText, !isValidPhone && styles.buttonTextDisabled]}>Compartir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.instructionContainer}>
          <Text style={styles.instructionTitle}>💡 Después de configurar tu QRing:</Text>
          <Text style={styles.instructionText}>
            • Ingresa tu número de WhatsApp completo{'\n'}
            • Agrega tu dirección si deseas que aparezca{'\n'}
            • Guarda los cambios y comparte tu QR
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EAF6FF'
  },
  contentContainer: {
    flex: 1,
    margin: 24,
    backgroundColor: '#fff',
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    paddingTop: 36,
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 0
  },
  qrContainer: {
    width: 220,
    height: 220,
    marginBottom: 32,
    alignSelf: 'center',
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  qrOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    zIndex: 1
  },
  groupWrapper: {
    width: '90%',
    marginTop: 16
  },
  labelWrapper: {
    position: 'absolute',
    top: -8,
    left: 16,
    zIndex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8
  },
  groupContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 8,
    paddingTop: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 64
  },
  inputPhone: {
    width: '90%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#48484A',
    textAlign: 'center',
    borderWidth: 0
  },
  inputError: {
    borderColor: 'transparent',
    backgroundColor: 'rgba(255, 59, 48, 0.05)'
  },
  addressGroupContainer: {
    marginTop: 16
  },
  addressContent: {
    width: '100%',
    marginTop: 0
  },
  addressInputsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 16
  },
  inputGroup: {
    width: '90%',
    marginBottom: 16,
    position: 'relative'
  },
  label: {
    fontWeight: 'bold',
    color: '#48484A',
    fontSize: 15
  },
  sublabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 0,
    marginLeft: 0,
    position: 'absolute',
    top: -8,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    zIndex: 1
  },
  inputAddress: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#B0B0B0',
    fontSize: 24,
    paddingLeft: 16
  },
  rowInputs: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16
  },
  inputGroupHalf: {
    width: '47%',
    position: 'relative'
  },
  inputSmall: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#B0B0B0',
    fontSize: 24,
    paddingLeft: 16
  },
  inputGroupQuarter: {
    width: '47%',
    position: 'relative'
  },
  inputTiny: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#B0B0B0',
    fontSize: 24,
    paddingLeft: 16,
    textAlign: 'center'
  },
  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'flex-start'
  },
  checkLabel: {
    color: '#007AFF',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 2
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 32,
    marginBottom: 24
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    minWidth: 100
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 4
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: '#f8f8f8'
  },
  buttonTextDisabled: {
    color: '#999'
  },
  instructionContainer: {
    width: '90%',
    backgroundColor: '#EAF6FF',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8
  },
  instructionTitle: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
    paddingLeft: '5%'
  },
  instructionText: {
    color: '#48484A',
    fontSize: 14,
    lineHeight: 22,
    paddingLeft: '5%'
  }
}); 