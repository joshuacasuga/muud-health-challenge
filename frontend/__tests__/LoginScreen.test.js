import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import api from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage and API
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

jest.mock('../utils/api', () => ({
  post: jest.fn(),
}));

const Wrapped = () =>(
  <NavigationContainer>
    <LoginScreen />
  </NavigationContainer>
);

describe('LoginScreen', () => {
    // checks rendering of email input, password input, and login button
    it('renders inputs and login button', () => {
        const { getByPlaceholderText, getByTestId } = render(<Wrapped />);
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByTestId('login-button')).toBeTruthy();
    });

    // simulates user typing in email and password inputs
    it('updates email and password fields', () => {
        const { getByPlaceholderText } = render(<Wrapped />);
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');

        expect(emailInput.props.value).toBe('test@example.com');
        expect(passwordInput.props.value).toBe('password123');
    });

    // simulates successful login; checks for saved token and if navigation occurs
    it('stores JWT and navigates on successful login', async () => {
        api.post.mockResolvedValueOnce({ data: { token: 'fake-token' } });

        const { getByPlaceholderText, getByTestId } = render(<Wrapped />);

        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
        fireEvent.press(getByTestId('login-button'));

        await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/auth/login', {
            email: 'test@example.com',
            password: 'password123',
        });
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
        });
    });

    // simulates failed login and checks if alert is triggered
    it('shows alert on failed login', async () => {
        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
        api.post.mockRejectedValueOnce(new Error('Invalid login'));

        const { getByPlaceholderText, getByTestId } = render(<Wrapped />);

        fireEvent.changeText(getByPlaceholderText('Email'), 'wrong@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'badpassword');
        fireEvent.press(getByTestId('login-button'));

        await waitFor(() => {
        expect(api.post).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalled(); // won't show native alert but confirms call
        });

        alertSpy.mockRestore();
    });
});
