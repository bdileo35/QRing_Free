import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { QRGenerator } from '../components/common/QRGenerator';
import { useFocusEffect } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot'; // Biblioteca para capturar la vista
import * as MediaLibrary from 'expo-media-library'; // Biblioteca para guardar en galería

export default function InicioScreen() {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [showAddressInLabel, setShowAddressInLabel] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  // Cargar datos cada vez que la pantalla se enfoca
  useFocusEffect(
    React.useCallback(() => {
      const loadConfig = async () => {
        try {
          const savedConfig = await AsyncStorage.getItem('@qring_config');
          if (savedConfig) {
            const configData = JSON.parse(savedConfig);
            console.log('Datos cargados en InicioScreen:', configData);
            setPhone(configData.phone ? `11 ${configData.phone.slice(2, 6)}-${configData.phone.slice(6)}` : '');
            const fullAddress = `${configData.address.street || ''} ${configData.address.number || ''}${
              configData.address.floor ? ` - Piso ${configData.address.floor}` : ''
            }${configData.address.apartment ? ` Dpto ${configData.address.apartment}` : ''}`;
            setAddress(fullAddress.trim());
            setQrValue(`https://wa.me/549${configData.phone}`);
            setShowAddressInLabel(configData.showInLabel || false);
          } else {
            setPhone('');
            setAddress('');
            setQrValue('');
            setShowAddressInLabel(false);
          }
        } catch (error) {
          console.error('Error cargando configuración en InicioScreen:', error);
          setPhone('');
          setAddress('');
          setQrValue('');
          setShowAddressInLabel(false);
        }
      };

      loadConfig();
    }, [])
  );

  // Guardar la etiqueta en la galería
  const saveToGallery = async () => {
    if (viewShotRef.current && typeof viewShotRef.current.capture === 'function') {
      try {
        const uri = await viewShotRef.current.capture();
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(uri);
          Alert.alert('¡Éxito!', 'Etiqueta guardada en la galería.');
        } else {
          Alert.alert('Permiso denegado', 'No se pudo guardar la etiqueta en la galería.');
        }
      } catch (error) {
        console.error('Error guardando la etiqueta:', error);
        Alert.alert('Error', 'Ocurrió un error al guardar la etiqueta.');
      }
    } else {
      Alert.alert('Error', 'No se pudo capturar la etiqueta.');
      console.error('Error guardando la etiqueta: viewShotRef.current o capture no están disponibles');
    }
  };

  return (
    <View style={styles.root}>
      <Header />
      <LinearGradient
        colors={["#e3f0ff", "#eaf6ff", "#ffffff"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            <Text style={{color: '#007AFF'}}>QR</Text>
            <Text style={{color: '#000'}}>ing</Text>
          </Text>
          <Text style={styles.subtitle}>Tu timbre inteligente</Text>

          {/* Contenedor de número y estado */}
          <View style={{width: '80%', alignItems: 'center', marginBottom: 15, alignSelf: 'center', marginTop: 11}}>
            <View style={{position: 'absolute', top: -8, left: 18, zIndex: 2, backgroundColor: '#fff', paddingHorizontal: 10}}>
              <Text style={{color: '#27ae60', fontWeight: 'bold', fontSize: 14}}>● ACTIVADO</Text>
            </View>
            <View style={{borderWidth: 2, borderColor: '#27ae60', borderRadius: 16, paddingVertical: 18, paddingHorizontal: 28, width: '100%', backgroundColor: '#fff', alignItems: 'center'}}>
              <Text style={{fontSize: 40, fontWeight: 'bold', color: '#222', letterSpacing: 1}}>{phone || 'Sin número'}</Text>
            </View>
          </View>

          {/* Tarjeta de timbre */}
          <View style={{backgroundColor: '#fff', borderRadius: 24, padding: 12, alignItems: 'center', marginBottom: 18, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4, width: '80%', alignSelf: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8}}>
              <Ionicons name="notifications" size={28} color="#007AFF" />
              <Text style={{color: '#007AFF', fontWeight: 'bold', fontSize: 36, marginHorizontal: 8}}>TIMBRE</Text>
              <Ionicons name="notifications" size={28} color="#007AFF" />
            </View>
            {/* Generador de QR */}
            <QRGenerator value={qrValue || 'invalid'} size={250} />
            <Text style={{fontSize: 22, color: '#48484A', marginBottom: 14}}>{address || 'Sin dirección'}</Text>
            <View style={{backgroundColor: '#eaf6ff', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 6, marginTop: 1}}>
              <Text style={{color: '#007AFF', fontWeight: 'bold', fontSize: 13}}>QRing 2.0</Text>
            </View>
          </View>

          {/* Botón exportar */}
          <View style={{width: '80%', alignItems: 'center', marginBottom: 12, alignSelf: 'center'}}>
            <TouchableOpacity
              style={{backgroundColor: '#007AFF', borderRadius: 10, width: '100%', paddingVertical: 12, alignItems: 'center'}}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 22}}>Imprimir Etiqueta</Text>
            </TouchableOpacity>
          </View>

          {/* Modal de vista previa */}
          <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
                  <View style={styles.labelContainer}>
                    <View style={styles.labelHeader}>
                      <Ionicons name="notifications-outline" size={24} color="#007AFF" />
                      <Text style={styles.labelTitle}>TIMBRE</Text>
                      <Ionicons name="notifications-outline" size={24} color="#007AFF" />
                    </View>
                    <QRGenerator value={qrValue || 'invalid'} size={180} />
                    {showAddressInLabel && address && (
                       <Text style={styles.labelAddressText}>{address}</Text>
                    )}
                    <View style={styles.labelFooter}>
                      <Text style={styles.qringText}>
                        <Text style={{color: '#007AFF'}}>QR</Text>
                        <Text style={{color: '#000'}}>ing</Text>
                        <Text style={{color: '#48484A'}}> 2.0</Text>
                      </Text>
                    </View>
                  </View>
                </ViewShot>
                <TouchableOpacity style={styles.saveButton} onPress={saveToGallery}>
                  <Text style={styles.saveButtonText}>Guardar en Galería</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EAF6FF',
  },
  gradient: {
    flex: 1,
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
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 0,
  },
  subtitle: {
    fontSize: 20,
    color: '#8E8E93',
    textAlign: 'center',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  labelContainer: {
    borderWidth: 2,
    borderColor: '#B0B0B0',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 250,
  },
  labelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  labelTitle: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 28,
    marginHorizontal: 8,
  },
  labelAddressText: {
    fontSize: 14,
    color: '#48484A',
    marginTop: 8,
    textAlign: 'center',
    maxWidth: '90%',
  },
  labelFooter: {
    marginTop: 12,
    backgroundColor: '#eaf6ff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  qringText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 12,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});