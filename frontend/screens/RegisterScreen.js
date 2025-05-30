import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import api from '../utils/api.js'

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    try {
        const res = await api.post('/auth/register', { 
            email, 
            password 
        });

      if (res.data.success) {
        Alert.alert('Success', 'Registration successful! Please log in.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', res.data.error || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', error.res?.data?.error || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Register" onPress={handleRegister} testID='register-button' />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 80,
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
});
