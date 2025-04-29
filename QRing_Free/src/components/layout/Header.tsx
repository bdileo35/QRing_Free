import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { COLORS, SHADOWS } from '@constants/theme';

export const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateText}>
            {format(currentTime, "EEEE, d 'de' MMMM", { locale: es })}
          </Text>
          <Text style={styles.timeText}>
            {format(currentTime, 'HH:mm')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray[300],
    ...SHADOWS.md,
    zIndex: 10,
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  dateTimeContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.gray[600],
    marginBottom: 2,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray[800],
  },
}); 