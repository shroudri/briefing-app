import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import theme from '../theme';
import SearchBar from '../components/SearchBar';
import AirportQuickCard from '../components/AirportQuickCard';

const HomeScreen = () => {
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
            <SearchBar/>
            <ScrollView>
              {favAirportList
               ? favAirportList.map((airport) => 
                  <AirportQuickCard key={airport} airport={airport} />) 
               : <Text>Loading...</Text>}
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    }
})


export default HomeScreen;