// src/components/forms/PhoneInput.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { phoneValidator } from '../../utils/phoneValidator';

export const PhoneInput = () => {
  const [phone, setPhone] = useState('');
  const [validation, setValidation] = useState(phoneValidator.validate(''));

  const handlePhoneChange = (text: string) => {
    const cleaned = phoneValidator.clean(text);
    if (cleaned.length <= 10) {
      setPhone(phoneValidator.formatForDisplay(cleaned));
      setValidation(phoneValidator.validate(cleaned));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={phone}
        onChangeText={handlePhoneChange}
        keyboardType="numeric"
        maxLength={15}
        style={styles.input}
        error={!validation.isValid && phone.length > 0}
        mode="outlined"
        outlineColor="#007AFF"
        activeOutlineColor="#007AFF"
        placeholder="(11) 1234-5678"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
  }
});