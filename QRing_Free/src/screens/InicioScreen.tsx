import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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
          {/* Contenedor de número y estado */}
          <View style={{width: '80%', alignItems: 'center', marginBottom: 15, alignSelf: 'center', marginTop: 11}}>
            <View style={{position: 'absolute', top: -8, left: 18, zIndex: 2, backgroundColor: '#fff', paddingHorizontal: 10}}>
              <Text style={{color: '#27ae60', fontWeight: 'bold', fontSize: 14}}>● ACTIVADO</Text>
            </View>
            <View style={{borderWidth: 2, borderColor: '#27ae60', borderRadius: 16, paddingVertical: 18, paddingHorizontal: 28, width: '100%', backgroundColor: '#fff', alignItems: 'center'}}>
              <Text style={{fontSize: 40, fontWeight: 'bold', color: '#222', letterSpacing: 1}}>5491122473759</Text>
            </View>
          </View>
          {/* Tarjeta de timbre */}
          <View style={{backgroundColor: '#fff', borderRadius: 24, padding: 12, alignItems: 'center', marginBottom: 18, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4, width: '80%', alignSelf: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8}}>
              <Ionicons name="notifications" size={28} color="#007AFF" />
              <Text style={{color: '#007AFF', fontWeight: 'bold', fontSize: 36, marginHorizontal: 8}}>TIMBRE</Text>
              <Ionicons name="notifications" size={28} color="#007AFF" />
            </View>
            <View style={{width: 250, height: 250, backgroundColor: '#F3F3F3', borderRadius: 18, marginBottom: 14, borderWidth: 2, borderColor: '#B0B0B0', alignSelf: 'center'}} />
            <Text style={{fontSize: 22, color: '#48484A', marginBottom: 14}}>Tilcara 2306 - 4D</Text>
            <View style={{backgroundColor: '#eaf6ff', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 6, marginTop: 1}}>
              <Text style={{color: '#007AFF', fontWeight: 'bold', fontSize: 13}}>QRing 2.0</Text>
            </View>
          </View>
          {/* Botón exportar */}
          <View style={{width: '80%', alignItems: 'center', marginBottom: 12, alignSelf: 'center'}}>
            <View style={{backgroundColor: '#007AFF', borderRadius: 10, width: '100%', paddingVertical: 12, alignItems: 'center'}}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 22}}>Exportar Etiqueta</Text>
            </View>
          </View>
          {/* Instrucciones */}
          <View style={{backgroundColor: '#f6faff', borderRadius: 12, padding: 14, width: '80%', marginTop: 4, alignSelf: 'center'}}>
            <Text style={{color: '#007AFF', fontWeight: 'bold', fontSize: 18, marginBottom: 2}}>💡 Después de imprimir tu etiqueta:</Text>
            <Text style={{color: '#48484A', fontSize: 14}}>
              • Pegála cerca de tu puerta a la altura de los hombros 
              {'\n'}• Asegurate que esté en un lugar visible y de fácil acceso
              {'\n'}• Protegela de la exposición directa al sol y la lluvia
            </Text>
          </View>
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