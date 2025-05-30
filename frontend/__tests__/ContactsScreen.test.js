import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ContactsScreen from '../screens/ContactsScreen';
import api from '../utils/api';

jest.mock('../utils/api');

const Wrapped = () => (
  <NavigationContainer>
    <ContactsScreen />
  </NavigationContainer>
);

describe('ContactsScreen', () => {
    // mocks API response and checks if contact names/emails are rendered
    it('displays contact names and emails', async () => {
        api.get.mockResolvedValueOnce({
        data: [{ id: 1, contact_name: 'Alice', contact_email: 'alice@example.com' }]
        });

        const { getByText } = render(<Wrapped />);
        await waitFor(() => {
        expect(getByText('Alice')).toBeTruthy();
        expect(getByText('alice@example.com')).toBeTruthy();
        });
    });

    // checks if "Add Contact" button is rendered
    it('renders Add Contact button', async () => {
        const { getByText } = render(<Wrapped />);

        await waitFor(() => {
            expect(getByText('Add Contact')).toBeTruthy();
        });
    });
});
