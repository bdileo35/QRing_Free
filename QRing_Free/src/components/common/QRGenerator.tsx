import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { COLORS, SHADOWS } from '../../constants/theme';

interface QRGeneratorProps {
  value: string;
  size?: number;
  style?: ViewStyle;
  logo?: string;
  backgroundColor?: string;
  foregroundColor?: string;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({
  value,
  size = 200,
  style,
  logo,
  backgroundColor = COLORS.white,
  foregroundColor = COLORS.black,
}) => {
  return (
    <View style={[styles.container, style]}>
      <QRCode
        value={value}
        size={size}
        backgroundColor={backgroundColor}
        color={foregroundColor}
        logo={logo ? { uri: logo } : undefined}
        logoSize={size * 0.2}
        logoBackgroundColor={backgroundColor}
        logoBorderRadius={10}
        quietZone={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.md,
  },
}); 