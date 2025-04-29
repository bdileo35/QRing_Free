import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { ScreenContainer } from '@components/layout/ScreenContainer';
import { Header } from '@components/layout/Header';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { COLORS } from '@constants/theme';
import { TextInput as PaperTextInput } from 'react-native-paper';

export const ConfigScreen: React.FC = () => {
  const [medio, setMedio] = useState<'whatsapp' | 'llamada'>('whatsapp');
  const [telefono, setTelefono] = useState('');
  const [calle, setCalle] = useState('');
  const [altura, setAltura] = useState('');
  const [dpto, setDpto] = useState('');
  const [mostrarDireccion, setMostrarDireccion] = useState(true);

  const color = medio === 'whatsapp' ? '#25D366' : COLORS.primary;
  const icon = medio === 'whatsapp' ? (
    <FontAwesome name="whatsapp" size={24} color={color} />
  ) : (
    <Ionicons name="call" size={24} color={color} />
  );

  return (
    <View style={styles.root}>
      <Header />
      <ScreenContainer>
        <Text style={styles.title}>Configuración del Timbre</Text>
        <View style={styles.qrPlaceholder} />
        <Text style={styles.label}>Número de {medio === 'whatsapp' ? 'WhatsApp' : 'Teléfono'}</Text>
        <View style={[styles.inputRow, { borderColor: color }]}> 
          {icon}
          <PaperTextInput
            mode="outlined"
            label={medio === 'whatsapp' ? 'Número de WhatsApp' : 'Número de Teléfono'}
            placeholder={medio === 'whatsapp' ? '54 911 12345678' : 'Ej: 1123456789'}
            keyboardType="phone-pad"
            value={telefono}
            onChangeText={setTelefono}
            style={styles.paperInput}
            editable={false} // Solo UI
            theme={{ colors: { primary: color, outline: color } }}
          />
        </View>
        <Text style={styles.label}>Dirección</Text>
        <View style={styles.direccionRow}>
          <Switch
            value={mostrarDireccion}
            onValueChange={() => setMostrarDireccion(!mostrarDireccion)}
            trackColor={{ false: COLORS.gray[300], true: COLORS.primary }}
            thumbColor={mostrarDireccion ? COLORS.primary : COLORS.gray[100]}
          />
          <Text style={styles.checkLabel}>Mostrar en la etiqueta</Text>
        </View>
        <PaperTextInput
          mode="outlined"
          label="Calle"
          placeholder="Calle"
          value={calle}
          onChangeText={setCalle}
          style={styles.paperInput}
          editable={false} // Solo UI
        />
        <View style={styles.alturaDptoRow}>
          <PaperTextInput
            mode="outlined"
            label="Altura"
            placeholder="Altura"
            value={altura}
            onChangeText={setAltura}
            keyboardType="numeric"
            style={[styles.paperInput, styles.inputHalf]}
            editable={false} // Solo UI
          />
          <PaperTextInput
            mode="outlined"
            label="Dpto"
            placeholder="Dpto"
            value={dpto}
            onChangeText={setDpto}
            style={[styles.paperInput, styles.inputHalf]}
            editable={false} // Solo UI
          />
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  qrPlaceholder: {
    width: 180,
    height: 180,
    backgroundColor: COLORS.gray[100],
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: COLORS.gray[300],
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 2,
    color: COLORS.gray[800],
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: COLORS.white,
  },
  paperInput: {
    flex: 1,
    marginLeft: 8,
    color: COLORS.gray[800],
    paddingVertical: 8,
  },
  selectorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 12,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray[300],
  },
  selectorText: {
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 15,
  },
  direccionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkLabel: {
    marginLeft: 8,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  alturaDptoRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  inputHalf: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.danger,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  resetButtonText: {
    color: COLORS.danger,
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 