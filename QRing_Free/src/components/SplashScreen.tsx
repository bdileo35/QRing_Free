import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { COLORS } from '@constants/theme';

export const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <ActivityIndicator size="large" color={COLORS.primary} style={styles.spinner} />
      <Text style={styles.text}>Cargando Datos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  spinner: {
    marginBottom: 24,
  },
  text: {
    fontSize: 20,
    color: COLORS.gray[700],
    fontWeight: 'bold',
  },
}); 