import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ConfigScreen() {
  const [showInLabel, setShowInLabel] = useState(true);

  return (
    <View style={styles.root}>
      <Header />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Configuración del Timbre</Text>
        <View style={styles.qrPlaceholder} />
        
        <View style={styles.groupWrapper}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>WhatsApp</Text>
          </View>
          <View style={styles.groupContainer}>
            <View style={styles.inputPhone} />
          </View>
          </View>

        <View style={styles.groupWrapper}>
          <View style={styles.labelWrapper}>
            <View style={styles.directionRow}>
              <Text style={styles.label}>Dirección</Text>
              <Checkbox.Android
                status={showInLabel ? 'checked' : 'unchecked'}
                onPress={() => setShowInLabel(!showInLabel)}
                color="#007AFF"
              />
              <Text style={styles.checkLabel}>Mostrar en la etiqueta</Text>
            </View>
          </View>
          <View style={[styles.groupContainer, styles.addressGroupContainer]}>
            <View style={styles.addressContent}>
              <View style={styles.addressInputsContainer}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, styles.sublabel]}>Calle</Text>
                  <View style={styles.inputAddress} />
                </View>
                <View style={styles.rowInputs}>
                  <View style={styles.inputGroupHalf}>
                    <Text style={[styles.label, styles.sublabel]}>Altura</Text>
                    <View style={styles.inputSmall} />
                  </View>
                  <View style={styles.inputGroupHalf}>
                    <Text style={[styles.label, styles.sublabel]}>Dpto</Text>
                    <View style={styles.inputSmall} />
                  </View>
                </View>
              </View>
            </View>
          </View>
          </View>

        <View style={styles.buttonRow}>
          <View style={[styles.actionButton, styles.resetButton]}>
            <Icon name="refresh" size={20} color="#C62828" />
            <Text style={[styles.buttonText, styles.resetText]}>Limpiar</Text>
          </View>
          <View style={styles.actionButton}>
            <Icon name="content-save" size={20} color="#fff" />
            <Text style={styles.buttonText}>Guardar</Text>
          </View>
          <View style={styles.actionButton}>
            <Icon name="share-variant" size={20} color="#fff" />
            <Text style={styles.buttonText}>Compartir</Text>
          </View>
        </View>

        <View style={styles.instructionContainer}>
          <Text style={styles.instructionTitle}>💡 Después de configurar tu QRing:</Text>
          <Text style={styles.instructionText}>
            • Ingresa tu número de WhatsApp completo{'\n'}
            • Agrega tu dirección si deseas que aparezca{'\n'}
            • Guarda los cambios y comparte tu QR
          </Text>
        </View>
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
    marginBottom: 24,
    marginTop: 0,
  },
  subtitle: {
    fontSize: 18,
    color: '#48484A',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 0,
    fontWeight: '500',
  },
  placeholderContainer: {
    display: 'none',
  },
  inputPlaceholder: {
    width: '85%',
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 18,
  },
  checkPlaceholder: {
    width: 120,
    height: 24,
    backgroundColor: '#D1D1D6',
    borderRadius: 12,
    marginLeft: 18
    ,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#F3F3F3',
    borderRadius: 24,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#B0B0B0',
    alignSelf: 'center',
  },
  inputPhone: {
    width: '90%',
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '90%',
    marginBottom: 12,
    justifyContent: 'flex-start',
  },
  label: {
    fontWeight: 'bold',
    color: '#48484A',
    fontSize: 15,
    flex: 1,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAddress: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#B0B0B0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputSmallContainer: {
    width: '48%',
  },
  inputSmall: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#B0B0B0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 32,
    marginBottom: 24,
  },
  actionButton: {
    width: '30%',
    height: 40,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 8,
  },
  resetButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#C62828',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  resetText: {
    color: '#C62828',
  },
  checkLabel: {
    color: '#007AFF',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 2,
    marginRight: 8,
  },
  addressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 12,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  groupWrapper: {
    width: '90%',
    marginTop: 16,
  },
  labelWrapper: {
    position: 'absolute',
    top: -8,
    left: 16,
    zIndex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
  },
  groupContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    paddingTop: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 80,
  },
  addressGroupContainer: {
    marginTop: 16,
  },
  labelContainer: {
    width: '100%',
    paddingLeft: 0,
  },
  sublabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 0,
    marginLeft: 0,
    position: 'absolute',
    top: -8,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  checkRowTop: {
    marginTop: 0,
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'space-between',
  },
  addressContent: {
    width: '100%',
    marginTop: 0,
  },
  addressInputsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  inputGroup: {
    width: '90%',
    marginBottom: 8,
    position: 'relative',
  },
  inputGroupHalf: {
    width: '47%',
    position: 'relative',
  },
  rowInputs: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  instructionContainer: {
    width: '90%',
    backgroundColor: '#EAF6FF',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
  },
  instructionTitle: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
    paddingLeft: '5%',
  },
  instructionText: {
    color: '#48484A',
    fontSize: 14,
    lineHeight: 22,
    paddingLeft: '5%',
  },
}); 