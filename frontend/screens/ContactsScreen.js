import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Button } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../utils/api';

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contacts/user');
      setContacts(res.data);
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
      Alert.alert('Error', 'Unable to load contacts.');
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchContacts();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contacts</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contact}>
            <Text>{item.contact_name}</Text>
            <Text>{item.contact_email}</Text>
          </View>
        )}
      />
      <Button title="Add Contact" onPress={() => navigation.navigate('AddContact')} />
    </View>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  contact: { padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 5 }
});
