import { React, useState, useEffect } from "react";

import { Header, Icon } from "@rneui/base";
import AsyncStorage from '@react-native-async-storage/async-storage';


const AppSubHeader = ( props ) => {
    const [isFav, setIsFav] = useState(false);
    const [loading, setLoading] = useState(true);

    const retrieveFavAirportList = async () => {
      try {
        let favAirportStorage = await AsyncStorage.getItem('userFavAirports');

        // If favAirportStorage is null, return an empty array
        favAirportStorage ? null : favAirportStorage = "[]";
        let favAirportList = JSON.parse(favAirportStorage);

        return favAirportList
      }
      catch (error) {
        console.log(error)
        return []
      }
    }

    const airportIsInFavList = async (icaoCode) => {
      try {
          let favAirportStorage = await AsyncStorage.getItem('userFavAirports');
          let favAirportList = JSON.parse(favAirportStorage);
          if (favAirportList.includes(icaoCode)) {
              setIsFav(true)
              console.log("Airport " + icaoCode + " detected in the fav list")
              return true
          } else {
              return false
          }
      }
      catch (error) {
          return false
      }
  }

    const storeFavAirport = async (icaoCode) => {
      try {
        let favAirportList = await retrieveFavAirportList();

        // Push airport and save data
        favAirportList.includes(icaoCode) ? console.log("Airport already included in the fav list") : favAirportList.push(icaoCode);
        AsyncStorage.setItem('userFavAirports', JSON.stringify(favAirportList));
  
        // Change state
        setIsFav(true);

        console.log("Saved fav airports: ", favAirportList)
      }
      catch (error) {
        console.log(error)
      }
    };

    const removeFavAirport = async (icaoCode) => {
      try {
        let favAirportList = await retrieveFavAirportList();
        favAirportList.splice(favAirportList.indexOf(icaoCode), 1)
        AsyncStorage.setItem('userFavAirports', JSON.stringify(favAirportList));
        setIsFav(false);

        console.log("Saved fav airports: ", favAirportList)

      }
      catch (error) {
        console.log(error)
      }
    }
  
    const handlePress = async (icaoCode) => {
      let favAirportList = await retrieveFavAirportList();
      favAirportList.includes(icaoCode) ? removeFavAirport(icaoCode) : storeFavAirport(icaoCode);
    }

    useEffect(() => {
      airportIsInFavList(props.icaoCode)
    })

    return (
        <Header
        backgroundColor="#619eff"
        backgroundImageStyle={{}}
        barStyle="default"
        centerComponent={{
          text: `${props.icaoCode}`,
          style: { color: "#fff", fontWeight: "bold" }
        }}
        containerStyle={{ width: "100%" }}
        leftContainerStyle={{}}
        linearGradientProps={{}}
        placement="center"
        rightContainerStyle={{}}
        rightComponent={
          <Icon
            name={isFav ? "star" : "star-outline"}
            type="material"
            color="#fff"
            onPress={() => handlePress(props.icaoCode)}
          />
        }
      />
    );
}

export default AppSubHeader