import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { View, StyleSheet } from 'react-native';

interface QRGeneratorProps {
  value: string;
  size: number;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({ value, size }) => {
  return (
    <View style={styles.container}>
      <QRCode
        value={value}
        size={size}
        backgroundColor="white"
        color="black"
        quietZone={8}
        enableLinearGradient={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
}); 