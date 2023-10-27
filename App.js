import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter } from "react-router-native";
import Constants from 'expo-constants';
import Main from './src/components/Main';


export default function App() {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}


