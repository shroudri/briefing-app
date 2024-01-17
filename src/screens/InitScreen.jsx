import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import theme from '../theme';
import SearchInputLabel from '../components/SearchInputLabel';


const InitScreen = () => {
  const [favAirportList, setFavAirportList] = useState([]);

  useEffect(() => {
    retrieveStoredFavAirports();
  }, []);

  const retrieveStoredFavAirports = async () => {
    try {
      let favAirportStorage = await AsyncStorage.getItem('userFavAirports');
      
      // If favAirportStorage is null, return an empty array
      let favAirportList = JSON.parse(favAirportStorage);

      setFavAirportList(favAirportList.sort((a, b) => a.localeCompare(b)));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  return (
        <View style={styles.container}>
            <SearchInputLabel />
            {favAirportList ? favAirportList.map((airport) => <Text key={airport}>{airport}</Text>) : <Text>Loading...</Text>}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    }
})


export default InitScreen;