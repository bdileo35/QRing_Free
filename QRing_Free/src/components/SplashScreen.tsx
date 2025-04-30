import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.titleBlue}>QR</Text>
        <Text style={styles.titleBlack}>ing</Text>
      </Text>
      <Text style={styles.subtitle}>Tu Timbre Digital</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleBlue: {
    color: COLORS.primary,
  },
  titleBlack: {
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.gray[600],
  },
});

export default SplashScreen; 