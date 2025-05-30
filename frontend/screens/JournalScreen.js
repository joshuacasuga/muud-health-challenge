// JournalScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Button } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../utils/api';

const JournalScreen = () => {
  const [entries, setEntries] = useState([]);
  const navigation = useNavigation();

  const fetchEntries = async () => {
    try {
      const res = await api.get('/journal/user');
      setEntries(res.data);
    } catch (err) {
      console.error('Failed to fetch journal entries:', err);
      Alert.alert('Error', 'Unable to load journal entries.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEntries();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Journal Entries</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text>{item.entry_text}</Text>
            <Text style={styles.mood}>Mood: {item.mood_rating}</Text>
          </View>
        )}
      />
      <Button title="New Entry" onPress={() => navigation.navigate('AddJournal')} />
    </View>
  );
};

export default JournalScreen;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  entry: { padding: 15, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 5 },
  mood: { fontStyle: 'italic', marginTop: 5 }
});
