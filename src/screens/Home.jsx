import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAirports from '../hooks/useAirports';

import theme from '../theme';
import SearchBar from '../components/SearchBar';
import AirportQuickCard from '../components/AirportQuickCard';
import ButtonDeleteFavAirports from '../components/ButtonDeleteFavAirports';

const HomeScreen = () => {
  const [favAirportList, setFavAirportList, addFavAirport, removeFavAirport, airportIsInFavList] = useAirports();
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [barValue, setBarValue] = useState('');

  const matchingAirports = favAirportList.filter((airport) => {
    return airport.includes(barValue.toUpperCase());
  })

  return (
    <View style={privStyles.container}>
      <SearchBar barValue={barValue} setBarValue={setBarValue} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => { setLastUpdate(new Date()) }} />
        }>
        {matchingAirports
          ? matchingAirports.map((airport) =>
            <AirportQuickCard key={airport} airport={airport} refresh={lastUpdate} />)
          : <Text>Loading...</Text>}

        {favAirportList.length === 0 && <Text style={{ textAlign: 'center' }}>No favorites yet</Text>}
        {favAirportList.length > 0 && matchingAirports.length === 0 && <Text style={{ textAlign: 'center' }}>No matching airports found</Text>}

      </ScrollView>

      {favAirportList.length > 0 && <ButtonDeleteFavAirports setFavAirportList={setFavAirportList} />}

      <View style={privStyles.footer}>
        <Text style={privStyles.footerText}>Updated at {lastUpdate.toLocaleTimeString()}</Text>
      </View>
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
    }, 
    footer: {
        backgroundColor: "#000000",
        padding: 3,
    },
    footerText: {
        textAlign: 'center',
        color: "white",
        fontSize: 12
    }
})


export default HomeScreen;