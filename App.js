import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Routes } from "react-router-native";
import Constants from 'expo-constants';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import AppHeader from './src/components/AppHeader';
import HomeScreen from './src/screens/Home';
import Airport from './src/screens/Airport';
import Settings from './src/screens/Settings';

import { SettingsContext, SettingsContextProvider } from './src/contexts/SettingsContext';

export default function App() {
  return (
    <SettingsContextProvider>
      <NativeRouter>
        <View style={{flex: 1}}>
            <StatusBar style="auto" />
            <AppHeader />

            <Routes>
                <Route exact path="/" element={<HomeScreen />} />
                <Route exact path="/search/:ICAO" element={<Airport />} />
                <Route exact path="/notams" element={<Text>Notams</Text>} />
                <Route exact path="/settings" element={<Settings />} />
            </Routes>
        </View>
      </NativeRouter>
    </SettingsContextProvider>
  );
}


