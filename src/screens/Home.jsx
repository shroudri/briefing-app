import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import theme from '../theme';
import SearchBar from '../components/SearchBar';
import AirportQuickCard from '../components/AirportQuickCard';
import ButtonDeleteFavAirports from '../components/ButtonDeleteFavAirports';

const HomeScreen = () => {
  const [favAirportList, setFavAirportList] = useState([]);

  const retrieveStoredFavAirports = async () => {
    try {
      let favAirportStorage = await AsyncStorage.getItem('userFavAirports');
      
      // If favAirportStorage is null, return an empty array
      let favAirportList = JSON.parse(favAirportStorage);

      setFavAirportList(favAirportList.sort((a, b) => a.localeCompare(b)));
    } catch (error) {
      console.log('Unable to read userFavAirports from local Storage. Maybe its empty?:', error);
    }
  };

  useEffect(() => {
    retrieveStoredFavAirports();
  }, []);

  return (
    <View style={privStyles.container}>
      <SearchBar />
      <ScrollView>
        {favAirportList
          ? favAirportList.map((airport) =>
            <AirportQuickCard key={airport} airport={airport} />)
          : <Text>Loading...</Text>}

        {favAirportList.length === 0
          ? <Text>No favorites yet</Text>
          : <ButtonDeleteFavAirports setFavAirportList={setFavAirportList}/>}
      </ScrollView>
    </View>
    );
}


const privStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    deleteListButton: {
        margin: 15,
        padding: 10,
        backgroundColor: "#e5e5e5",
        borderRadius: 5,
        borderWidth: 1
    }
})


export default HomeScreen;