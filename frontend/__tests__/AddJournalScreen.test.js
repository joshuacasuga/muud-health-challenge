import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddJournalScreen from '../screens/AddJournalScreen';
import api from '../utils/api';
import { Alert } from 'react-native';

jest.mock('../utils/api');
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: jest.fn() }),
}));

describe('AddJournalScreen', () => {
    // fills out and submits journal form, checks API call
    it('submits form and shows success alert', async () => {
        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
        api.post.mockResolvedValueOnce({});

        const { getByPlaceholderText, getByText } = render(<AddJournalScreen />);

        fireEvent.changeText(getByPlaceholderText('Write your entry...'), 'My thoughts');
        fireEvent.changeText(getByPlaceholderText('Mood rating (1-5)'), '5');
        fireEvent.press(getByText('Submit'));

        await waitFor(() => {
        expect(api.post).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith('Success', 'Journal entry added!');
        });
    });

    // ensures user cannot submit without filling required fields
    it('shows alert when title or content is missing', () => {
        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

        const { getByText } = render(<AddJournalScreen />);
        const submitButton = getByText('Submit');

        fireEvent.press(submitButton);

        expect(alertSpy).toHaveBeenCalledWith('Missing Fields', 'Please fill out all fields.');

        alertSpy.mockRestore();
    });
});
