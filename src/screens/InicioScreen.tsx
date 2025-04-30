import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Header } from '../components/Header';
import { ScreenContainer } from '../components/ScreenContainer';
import { QRGenerator } from '../components/common/QRGenerator';
import { COLORS, SHADOWS } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewShot, { captureRef } from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

interface ConfigData {
  phone: string;
  formattedPhone: string;
  address: {
    street: string;
    number: string;
    floor?: string;
    apartment?: string;
    showInLabel: boolean;
    fullAddress: string;
  };
  qrCode: string;
}

const InicioScreen: React.FC = () => {
  const [configData, setConfigData] = useState<ConfigData | null>(null);
  const viewShotRef = useRef<ViewShot>(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    loadConfigData();
  }, []);

  const loadConfigData = async () => {
    try {
      const savedConfig = await AsyncStorage.getItem('@qring_config');
      if (savedConfig) {
        setConfigData(JSON.parse(savedConfig));
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }
  };

  const handlePrintLabel = async () => {
    if (!viewShotRef.current) return;

    try {
      // Capturar la imagen del QR
      const uri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 0.8,
      });

      // Verificar permisos
      if (!status?.granted) {
        const newPermission = await requestPermission();
        if (!newPermission.granted) {
          alert('Se necesitan permisos para guardar la imagen');
          return;
        }
      }

      // Guardar en la galería
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('QRing', asset, false);

      // Compartir o imprimir
      if (Platform.OS === 'ios') {
        await Print.printAsync({
          uri: uri,
        });
      } else {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        }
      }
    } catch (error) {
      console.error('Error al imprimir/compartir:', error);
      alert('Error al procesar la imagen');
    }
  };

  if (!configData) {
    return (
      <View style={styles.container}>
        <Header />
        <ScreenContainer>
          <Text style={styles.message}>No hay datos configurados</Text>
        </ScreenContainer>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScreenContainer>
        <View 
          ref={viewShotRef}
          collapsable={false}
          style={styles.labelWrapper}
        >
          <View style={styles.labelContainer}>
            <View style={styles.statusSection}>
              <Text style={styles.statusText}>● ACTIVADO</Text>
              <Text style={styles.phone}>{configData.formattedPhone}</Text>
            </View>

            <View style={styles.qrSection}>
              <QRGenerator 
                value={configData.qrCode} 
                size={200}
              />
            </View>
            
            <View style={styles.infoSection}>
              {configData.address.showInLabel && (
                <Text style={styles.address}>{configData.address.fullAddress}</Text>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.printButton}
          onPress={handlePrintLabel}
        >
          <Icon name="printer" size={24} color="#fff" />
          <Text style={styles.buttonText}>Imprimir</Text>
        </TouchableOpacity>
      </ScreenContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  labelWrapper: {
    padding: 16,
  },
  labelContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  statusSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  statusText: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  qrSection: {
    marginBottom: 24,
  },
  infoSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  phone: {
    fontSize: 32,
    color: COLORS.gray[800],
    marginBottom: 8,
    fontWeight: '500',
  },
  address: {
    fontSize: 16,
    color: COLORS.gray[600],
    textAlign: 'center',
    marginTop: 8,
  },
  message: {
    fontSize: 18,
    color: COLORS.gray[600],
    textAlign: 'center',
    marginTop: 24,
  },
  printButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'center',
    marginTop: 24,
    ...SHADOWS.sm,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default InicioScreen; 