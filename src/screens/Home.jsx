import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';


import AirportQuickCard from '../components/AirportQuickCard';
import ButtonDeleteFavAirports from '../components/ButtonDeleteFavAirports';
import SearchBar from '../components/SearchBar';
import { AirportsContext } from '../contexts/AirportsContext';
import { ThemeContext } from '../contexts/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const favAirportsContext = useContext(AirportsContext);
  const [matchingAirports, setMatchingAirports] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [barValue, setBarValue] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      // Code to execute when the screen is focused
      console.log("Home focused")
      console.log("Fav airports context: ", favAirportsContext)

      return () =>
        // Code to execute when the screen is unfocused
        // Useful for cleanup functions
        setBarValue(''),
        console.log("Home unfocused")
    }, [])
  );


  const filterAirports = (airports) => {
    if (!barValue) {
      return airports
    }

    return airports.filter((airport) => {
      return airport.toLowerCase().includes(barValue.toLowerCase())
    })
  }

  useEffect(() => {
    setMatchingAirports(filterAirports(favAirportsContext.favAirports))
  }, [barValue, favAirportsContext.favAirports])

  const privStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.appBackground
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

  return (
    <View style={privStyles.container}>
      <SearchBar barValue={barValue} setBarValue={setBarValue} navigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => { setLastUpdate(new Date()) }} />
        }>
        {matchingAirports
          ? matchingAirports.map((airport) =>
            <AirportQuickCard key={airport} airport={airport} refresh={lastUpdate} naviagation={navigation} />)
          : <Text style={{ color: theme.colors.paragraphText }}>Loading...</Text>}

        {favAirportsContext.favAirports.length === 0 && <Text style={{ textAlign: 'center', color: theme.colors.paragraphText }}>No favorites yet</Text>}
        {favAirportsContext.favAirports.length > 0 && matchingAirports.length === 0 && <Text style={{ textAlign: 'center', color: theme.colors.paragraphText }}>No matching airports found within your favorites</Text>}
        {favAirportsContext.favAirports.length > 0 && matchingAirports.length === 0 && <><Text style={{ textAlign: 'center', color: theme.colors.paragraphText }}>Tap 🔍 to search</Text>
        </>
        }
      </ScrollView>

      {favAirportsContext.favAirports.length > 0 && <ButtonDeleteFavAirports setFavAirportList={favAirportsContext.setFavAirports} />}

      <View style={privStyles.footer}>
        <Text style={privStyles.footerText}>Updated at {lastUpdate.toLocaleTimeString()}</Text>
      </View>
    </View>
  );
}




export default HomeScreen;