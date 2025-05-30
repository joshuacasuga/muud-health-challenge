// AddJournalScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../utils/api';

const AddJournalScreen = () => {
  const [entryText, setEntryText] = useState('');
  const [moodRating, setMoodRating] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!entryText || !moodRating) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    try {
      await api.post('/journal/entry', {
        entry_text: entryText,
        mood_rating: moodRating,
      });
      Alert.alert('Success', 'Journal entry added!');
      navigation.goBack();
    } catch (err) {
      console.error('Error adding journal entry:', err);
      Alert.alert('Error', 'Could not add journal entry.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Write your entry..."
        style={styles.input}
        multiline
        numberOfLines={4}
        value={entryText}
        onChangeText={setEntryText}
      />
      <TextInput
        placeholder="Mood rating (1-5)"
        style={styles.input}
        keyboardType="numeric"
        value={moodRating}
        onChangeText={setMoodRating}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default AddJournalScreen;

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
