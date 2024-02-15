import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAirports() {
    const [favAirportList, setFavAirportList] = useState([]);

    useEffect(() => {
        retrieveFavAirportList();
    }, [])

    const retrieveFavAirportList = async () => {
        try {
          let favAirportStorage = await AsyncStorage.getItem('userFavAirports');
          let favAirportList = JSON.parse(favAirportStorage);
    
          setFavAirportList(favAirportList.sort((a, b) => a.localeCompare(b)));
        } catch (error) {
          console.log('Unable to read userFavAirports from local Storage. Maybe its empty?:', error);
        }
        return(favAirportList)
      };


      const addFavAirport = async (icaoCode) => {
        try {
          let favAirportList = await retrieveFavAirportList();
          favAirportList.includes(icaoCode) ? console.log("Airport already included in the fav list") : favAirportList.push(icaoCode);
          AsyncStorage.setItem('userFavAirports', JSON.stringify(favAirportList));
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
          console.log("Saved fav airports: ", favAirportList)
        }
        catch (error) {
          console.log(error)
        }
      }

      const airportIsInFavList = async (icaoCode) => {
        let favAirportList = await retrieveFavAirportList();
        return favAirportList.includes(icaoCode)
      }

      return [favAirportList, setFavAirportList, addFavAirport, removeFavAirport, airportIsInFavList]
}