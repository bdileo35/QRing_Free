import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';

export default function InicioScreen() {
  return (
    <View style={styles.root}>
      <Header />
      <LinearGradient
        colors={["#e3f0ff", "#eaf6ff", "#ffffff"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            <Text style={{color: '#007AFF'}}>QR</Text>
            <Text style={{color: '#000'}}>ing</Text>
          </Text>
          <Text style={styles.subtitle}>Tu timbre inteligente</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EAF6FF',
  },
  gradient: {
    flex: 1,
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
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 0,
  },
  subtitle: {
    fontSize: 20,
    color: '#8E8E93',
    textAlign: 'center',
    fontWeight: '500',
  },
}); 