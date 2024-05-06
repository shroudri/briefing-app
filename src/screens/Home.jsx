import React, { useContext, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import useAirports from '../hooks/useAirports';



import AirportQuickCard from '../components/AirportQuickCard';
import ButtonDeleteFavAirports from '../components/ButtonDeleteFavAirports';
import SearchBar from '../components/SearchBar';
import { ThemeContext } from '../contexts/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const [favAirportList, setFavAirportList, addFavAirport, removeFavAirport, airportIsInFavList] = useAirports();
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [barValue, setBarValue] = useState('');
  const theme = useContext(ThemeContext);

  const matchingAirports = favAirportList.filter((airport) => {
    return airport.includes(barValue.toUpperCase());
  })

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

        {favAirportList.length === 0 && <Text style={{ textAlign: 'center', color: theme.colors.paragraphText }}>No favorites yet</Text>}
        {favAirportList.length > 0 && matchingAirports.length === 0 && <Text style={{ textAlign: 'center', color: theme.colors.paragraphText }}>No matching airports found within your favorites</Text>}
        {favAirportList.length > 0 && matchingAirports.length === 0 && <><Text style={{ textAlign: 'center', color: theme.colors.paragraphText }}>Tap 🔍 to search</Text>
        </>
        }
      </ScrollView>

      {favAirportList.length > 0 && <ButtonDeleteFavAirports setFavAirportList={setFavAirportList} />}

      <View style={privStyles.footer}>
        <Text style={privStyles.footerText}>Updated at {lastUpdate.toLocaleTimeString()}</Text>
      </View>
    </View>
  );
}




export default HomeScreen;