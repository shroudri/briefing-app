import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import AppHeader from './src/components/AppHeader';

import AirportInformationScreen from './src/screens/AirportInformation';
import HomeScreen from './src/screens/Home';
import NotamsScreen from './src/screens/Notams';
import Settings from './src/screens/Settings';
import WeatherScreen from './src/screens/Weather';

import { SettingsContextProvider } from './src/contexts/SettingsContext';
import { ThemeContextProvider } from './src/contexts/ThemeContext';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SettingsContextProvider>
      <ThemeContextProvider>
        <NavigationContainer>
          <AppHeader />
          <View style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Weather" component={WeatherScreen} />
              <Stack.Screen name="AirportInformation" component={AirportInformationScreen} />
              <Stack.Screen name="Notams" component={NotamsScreen} />
              <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </ThemeContextProvider>
    </SettingsContextProvider>
  )

}


