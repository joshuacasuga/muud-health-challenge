import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import JournalScreen from './screens/JournalScreen';
import ContactsScreen from './screens/ContactsScreen';
import AddJournalScreen from './screens/AddJournalScreen';
import AddContactsScreen from './screens/AddContactsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Journal" component={JournalScreen} />
    <Tab.Screen name="Contacts" component={ContactsScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AddJournal" component={AddJournalScreen} />
        <Stack.Screen name="AddContact" component={AddContactsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
