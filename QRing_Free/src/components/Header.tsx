import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
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
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
    minHeight: 64,
  },
  logo: {
    width: 44,
    height: 44,
    marginRight: 12,
  },
  dateTimeContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#48484A',
  },
}); 