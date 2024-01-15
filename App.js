import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Routes } from "react-router-native";
import Constants from 'expo-constants';

import AppHeader from './src/components/AppHeader';
import InitScreen from './src/screens/InitScreen';
import WxScreen from './src/screens/WxView';


export default function App() {
  return (
    <NativeRouter>
        <View style={{flex: 1}}>
            <StatusBar style="auto" />
            <AppHeader />

            <Routes>
                <Route exact path="/" element={<InitScreen />} />
                <Route exact path="/search/:ICAO" element={<WxScreen />} />
                <Route exact path="/notams" element={<Text>Notams</Text>} />
                <Route exact path="/settings" element={<Text>Settings</Text>} />
            </Routes>
        </View>
    </NativeRouter>
  );
}


