import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Routes, Route, useLocation } from "react-router-native";
import Constants from 'expo-constants';
import { StatusBar } from "react-native";

import InitScreen from "./InitScreen";
import WeatherScreen from "./AirportScreen";
import AppHeader from "./AppHeader";
import AirportScreen from "./AirportScreen";


// Define routes

export default function Main() {
    return (
        <View style={{flex: 1}}>
            <StatusBar style="auto" />
            <AppHeader />

            <Routes>
                <Route exact path="/" element={<InitScreen />} />
                <Route exact path="/search/:ICAO" element={<AirportScreen />} />
                <Route exact path="/notams" element={<Text>Notams</Text>} />
                <Route exact path="/settings" element={<Text>Settings</Text>} />
            </Routes>

        </View>
    );
}
