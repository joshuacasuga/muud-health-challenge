import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../utils/api';
import { useNavigation } from '@react-navigation/native';

const AddContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleAddContact = async () => {
    if (!name || !email) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    try {
      await api.post('/contacts/add', {
        contact_name: name,
        contact_email: email,
      });
      Alert.alert('Success', 'Contact added!');
      navigation.goBack();
    } catch (err) {
      console.error('Error adding contact:', err);
      Alert.alert('Error', 'Could not add contact.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Contact Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Contact Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Add Contact" onPress={handleAddContact} />
    </View>
  );
};

export default AddContactScreen;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 4
  }
});
