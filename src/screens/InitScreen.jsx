import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import theme from '../theme';
import SearchInputLabel from '../components/SearchInputLabel';

const InitScreen = () => {
    return (
        <View style={styles.container}>
            <SearchInputLabel />
        </View>
    );
}

const getFavAirports = async () => {
    try {
      const value = await AsyncStorage.getItem('fav_airports');
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    }
})


export default InitScreen;