import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../utils/api.js'


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const res = await api.post('/auth/login', { 
                email, 
                password 
            });
            const { token } = res.data;

            await AsyncStorage.setItem('token', token);

            console.log('JWT Token stored:', token);
            navigation.navigate('Home')
        } catch (err) {
            console.error('Login error:', err);
            Alert.alert('Login Failed', 'Invalid email or password.');
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <Button title="Log In" onPress={handleLogin} testID="login-button" />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: 'blue', marginTop: 10 }}>Don't have an account? Register</Text>
        </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 12,
        borderRadius: 4
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
