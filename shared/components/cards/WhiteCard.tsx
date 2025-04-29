import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme';

interface WhiteCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const WhiteCard: React.FC<WhiteCardProps> = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.borderRadius.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.margin.card,
    shadowColor: theme.colors.cardShadow,
    shadowOffset: theme.spacing.shadow.offset,
    shadowOpacity: theme.spacing.shadow.opacity,
    shadowRadius: theme.spacing.shadow.radius,
    elevation: 3,
  },
}); 