import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, Routes } from "react-router-native";

import AppHeader from './src/components/AppHeader';
import HomeScreen from './src/screens/Home';
import NotamsScreen from './src/screens/Notams';
import Settings from './src/screens/Settings';
import WeatherScreen from './src/screens/Weather';

import { SettingsContextProvider } from './src/contexts/SettingsContext';
import { ThemeContextProvider } from './src/contexts/ThemeContext';

export default function App() {
  return (
    <SettingsContextProvider>
      <ThemeContextProvider>
        <NativeRouter>
          <View style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <AppHeader />

            <Routes>
              <Route exact path="/" element={<HomeScreen />} />
              <Route exact path="/weather/:ICAO" element={<WeatherScreen />} />
              <Route exact path="/notams/:ICAO" element={<NotamsScreen />} />
              <Route exact path="/settings" element={<Settings />} />
            </Routes>
          </View>
        </NativeRouter>
      </ThemeContextProvider>
    </SettingsContextProvider>
  );
}


