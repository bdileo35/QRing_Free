import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function HistorialScreen() {
  return (
    <View style={styles.root}>
      <Header />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Historial</Text>
      </View>
    </View>
  );
    }

  const styles = StyleSheet.create({
  root: {
      flex: 1,
    backgroundColor: '#EAF6FF',
    },
  contentContainer: {
      flex: 1,
    margin: 24,
    backgroundColor: '#fff',
    borderRadius: 24,
      alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    paddingTop: 36,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
      textAlign: 'center',
    marginBottom: 8,
    marginTop: 0,
    },
  });