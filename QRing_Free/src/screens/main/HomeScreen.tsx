import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Header, ScreenContainer, QRGenerator } from '../../components';
import { COLORS, SHADOWS } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

export const HomeScreen: React.FC = () => {
  const [configData, setConfigData] = useState<ConfigData | null>(null);

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

  const handleShare = async () => {
    if (!configData) return;

    try {
      await Share.share({
        message: `¡Hola! Este es mi timbre digital:\n\nTeléfono: ${configData.formattedPhone}\n${
          configData.address.showInLabel ? `Dirección: ${configData.address.fullAddress}\n` : ''
        }\nCódigo QR: ${configData.qrCode}`,
        title: 'QRing - Tu Timbre Digital',
      });
    } catch (error) {
      console.error('Error sharing:', error);
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
        <View style={styles.labelWrapper}>
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
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Icon name="share-variant" size={24} color="#fff" />
          <Text style={styles.buttonText}>Compartir</Text>
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
  shareButton: {
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