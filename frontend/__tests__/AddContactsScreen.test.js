import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddContactScreen from '../screens/AddContactsScreen';
import api from '../utils/api';
import { Alert } from 'react-native';

jest.mock('../utils/api');
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: jest.fn() }),
}));

describe('AddContactScreen', () => {
    // fills out and submits contact form, checks API call
    it('submits contact and shows success alert', async () => {
        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
        api.post.mockResolvedValueOnce({});

        const { getByPlaceholderText, getByText } = render(<AddContactScreen />);
        fireEvent.changeText(getByPlaceholderText('Contact Name'), 'Bob');
        fireEvent.changeText(getByPlaceholderText('Contact Email'), 'bob@example.com');
        fireEvent.press(getByText('Add Contact'));

        await waitFor(() => {
        expect(api.post).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Success', 'Contact added!');
        });
    });

    // ensures user cannot submit without filling required fields
    it('shows alert when name or email is missing', () => {
        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

        const { getByText } = render(<AddContactScreen />);
        const submitButton = getByText('Add Contact');

        fireEvent.press(submitButton);

        expect(alertSpy).toHaveBeenCalledWith('Missing Fields', 'Please fill out all fields.');

        alertSpy.mockRestore();
    });
});
