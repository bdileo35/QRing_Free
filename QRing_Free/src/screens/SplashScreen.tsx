import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const checkConfig = async () => {
      try {
        const savedConfig = await AsyncStorage.getItem('@qring_config');
        const configData = savedConfig ? JSON.parse(savedConfig) : null;
        
        setTimeout(() => {
          if (navigation && navigation.replace) {
            if (configData && configData.phone) {
              console.log('SplashScreen: Datos encontrados, navegando a Main.');
              navigation.replace('Main');
            } else {
              console.log('SplashScreen: Datos no encontrados o incompletos, navegando a Config.');
              navigation.replace('Config');
            }
          }
        }, 2000); 

      } catch (error) {
        console.error('SplashScreen: Error verificando configuración:', error);
        setTimeout(() => {
          if (navigation && navigation.replace) {
            navigation.replace('Config');
          }
        }, 2000);
      }
    };

    checkConfig();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image 
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.loadingText}>Cargando datos</Text>
        <ActivityIndicator 
          size="large" 
          color="#007AFF" 
          style={styles.spinner}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF6FF',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  loadingText: {
    fontSize: 36,
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 20,
  },
  spinner: {
    marginTop: 20,
  }
}); 