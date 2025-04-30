import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Header, ScreenContainer, QRGenerator } from '../../components';
import { COLORS, SHADOWS } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewShot, { captureRef } from "react-native-view-shot";
import Share from 'react-native-share';

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
  const viewShotRef = useRef(null);

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
    if (!configData || !viewShotRef.current) return;

    try {
      // Capturar la vista como imagen
      const uri = await captureRef(viewShotRef, {
        format: "png",
        quality: 1,
        result: "tmpfile"
      });

      // Compartir la imagen
      await Share.open({
        title: 'QRing - Tu Timbre Digital',
        filename: 'QRing_Label',
        url: Platform.OS === 'ios' ? `file://${uri}` : uri,
        type: 'image/png'
      });
    } catch (error) {
      console.error('Error capturing or sharing label:', error);
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
            <QRGenerator 
              value={configData.qrCode} 
              size={200}
              style={styles.qrSection}
            />
            
            <View style={styles.infoSection}>
              <Text style={styles.phone}>{configData.formattedPhone}</Text>
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
          <Text style={styles.buttonText}>Imprimir Etiqueta</Text>
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
  qrSection: {
    marginBottom: 24,
  },
  infoSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  phone: {
    fontSize: 24,
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