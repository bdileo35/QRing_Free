import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, ScreenContainer } from '@components/index';
import { COLORS } from '@constants/theme';

export const HistoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScreenContainer>
        <Text style={styles.title}>Historial</Text>
      </ScreenContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    textAlign: 'center',
  },
}); 