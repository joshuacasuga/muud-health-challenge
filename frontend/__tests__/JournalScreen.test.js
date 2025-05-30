import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import JournalScreen from '../screens/JournalScreen';
import api from '../utils/api';

jest.mock('../utils/api');

const Wrapped = () => (
  <NavigationContainer>
    <JournalScreen />
  </NavigationContainer>
);

describe('JournalScreen', () => {
    // mocks API response and checks if entries are displayed
    it('renders journal entries from API', async () => {
        api.get.mockResolvedValueOnce({
        data: [
            { id: 1, entry_text: 'Test entry', mood_rating: 4 }
        ]
        });

        const { getByText } = render(<Wrapped />);
        await waitFor(() => {
        expect(getByText('Test entry')).toBeTruthy();
        expect(getByText('Mood: 4')).toBeTruthy();
        });
    });

    // checks if "New Entry" button is rendered
    it('renders New Entry button', async () => {
        const { getByText } = render(<Wrapped />);

        await waitFor(() => {
            expect(getByText('New Entry')).toBeTruthy();
        });
    });
});
