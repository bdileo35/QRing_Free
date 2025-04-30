import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert, Share, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

  // Nueva función para compartir la etiqueta
  const shareLabel = async () => {
    if (viewShotRef.current && typeof viewShotRef.current.capture === 'function') {
      try {
        const uri = await viewShotRef.current.capture();
        await Share.share({
          url: uri, // En Android, compartir la URI directamente funciona para imágenes
          title: 'Etiqueta QRing',
          message: '¡Mira mi etiqueta QRing!', // Mensaje opcional
        });
      } catch (error) {
        console.error('Error compartiendo la etiqueta:', error);
        Alert.alert('Error', 'Ocurrió un error al compartir la etiqueta.');
      }
    } else {
      Alert.alert('Error', 'No se pudo capturar la etiqueta para compartir.');
      console.error('Error compartiendo la etiqueta: viewShotRef.current o capture no están disponibles');
    }
  };

  return (
    <View style={styles.root}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <View style={styles.numeroContainer}>
              <View style={styles.activadoBadge}>
                <Text style={styles.activadoText}>● ACTIVADO</Text>
              </View>
              <View style={styles.numeroBox}>
                <Text style={styles.numeroText}>{phone || 'Sin número'}</Text>
              </View>
            </View>

            {/* Tarjeta de timbre */}
            <View style={styles.timbreCard}>
              <View style={styles.timbreHeader}>
                <Ionicons name="notifications" size={28} color="#007AFF" />
                <Text style={styles.timbreTitle}>TIMBRE</Text>
                <Ionicons name="notifications" size={28} color="#007AFF" />
              </View>
              {(qrValue && qrValue !== 'invalid') ? (
                <QRGenerator value={qrValue} size={250} />
              ) : (
                <View style={styles.qrPlaceholder}>
                  <Ionicons name="qr-code-outline" size={150} color="#E0E0E0" />
                  <Text style={styles.qrPlaceholderText}>Configura tu número</Text>
                </View>
              )}
              <Text style={styles.addressText}>{address || 'Sin dirección'}</Text>
              <View style={styles.qringVersionBadge}>
                <Text style={styles.qringVersionText}>QRing 2.0</Text>
              </View>
            </View>

            {/* Botón exportar */}
            <View style={styles.exportButtonContainer}>
              <TouchableOpacity
                style={styles.exportButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.exportButtonText}>Imprimir Etiqueta</Text>
              </TouchableOpacity>
            </View>

            {/* --- Caja de Instrucciones (Corrección Definitiva) --- */}
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionTitle}>💡 ¡Tu QRing está listo!</Text>
              <Text style={styles.instructionText}>• Usa el botón 'Imprimir Etiqueta' para guardarla o compartirla.</Text>
              <Text style={styles.instructionText}>• Pégala cerca de tu puerta o timbre.</Text>
            </View>
            {/* --- Fin Caja de Instrucciones --- */}
          </View>
        </LinearGradient>
      </ScrollView>
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
            
            {/* Nueva estructura de botones */}
            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={styles.modalButton} onPress={saveToGallery}>
                <Icon name="download" size={20} color="#007AFF" />
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={shareLabel}>
                <Icon name="share-variant" size={20} color="#007AFF" />
                <Text style={styles.modalButtonText}>Compartir</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EAF6FF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
  },
  contentContainer: {
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
    paddingBottom: 24,
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
    padding: 20,
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
    marginBottom: 20,
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
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF6FF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 120,
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exportButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
  },
  exportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  instructionContainer: {
    width: '80%',
    backgroundColor: '#EAF6FF',
    borderRadius: 12,
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    marginTop: 16,
    marginBottom: 8,
    alignSelf: 'center',
  },
  instructionTitle: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  instructionText: {
    color: '#48484A',
    fontSize: 14,
    lineHeight: 20,
  },
  timbreCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 12,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    width: '80%',
    alignSelf: 'center',
  },
  timbreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  timbreTitle: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 36,
    marginHorizontal: 8,
  },
  qrPlaceholder: {
    width: 250,
    height: 250,
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  qrPlaceholderText: {
    marginTop: 8,
    fontSize: 16,
    color: '#B0B0B0',
  },
  addressText: {
    fontSize: 22, 
    color: '#48484A', 
    marginBottom: 14,
    textAlign: 'center',
  },
  qringVersionBadge: {
    backgroundColor: '#eaf6ff', 
    borderRadius: 8, 
    paddingHorizontal: 20, 
    paddingVertical: 6, 
    marginTop: 1,
  },
  qringVersionText: {
    color: '#007AFF', 
    fontWeight: 'bold', 
    fontSize: 13,
  },
  numeroContainer: {
    width: '80%', 
    alignItems: 'center', 
    marginBottom: 15, 
    alignSelf: 'center', 
    marginTop: 11
  },
  activadoBadge: {
    position: 'absolute', 
    top: -8, 
    left: 18, 
    zIndex: 2, 
    backgroundColor: '#fff', 
    paddingHorizontal: 10
  },
  activadoText: {
    color: '#27ae60', 
    fontWeight: 'bold', 
    fontSize: 14
  },
  numeroBox: {
    borderWidth: 2, 
    borderColor: '#27ae60', 
    borderRadius: 16, 
    paddingVertical: 18, 
    paddingHorizontal: 28, 
    width: '100%', 
    backgroundColor: '#fff', 
    alignItems: 'center'
  },
  numeroText: {
    fontSize: 40, 
    fontWeight: 'bold', 
    color: '#222', 
    letterSpacing: 1
  },
  exportButtonContainer: {
    width: '80%', 
    alignItems: 'center', 
    marginBottom: 12, 
    alignSelf: 'center'
  },
});