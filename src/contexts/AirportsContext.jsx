import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';


// Crear el contexto
export const AirportsContext = createContext();

// Crear el Provider
export function AirportsContextProvider({ children }) {
    const [favAirports, setFavAirports] = useState([]);

    const retrieveFavAirportsFromStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('favAirports')
            if (value !== null) {
                setFavAirports(JSON.parse(value))
                console.log("Retrieved fav airports from storage: ", value)
            } else {
                setFavAirports([])
            }
        } catch (e) {
            console.log(e)
        }
    }

    const saveFavAirportsToStorage = async () => {
        try {
            await AsyncStorage.setItem('favAirports', JSON.stringify(favAirports))
            console.log("Saved fav airports to storage: ", favAirports)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        retrieveFavAirportsFromStorage()
    }, [])

    useEffect(() => {
        // Avoid saving empty array
        if (favAirports.length > 0) {
            saveFavAirportsToStorage()
        }
    }, [favAirports])

    const addFavAirport = (icaoCode) => {
        try {
            favAirports.includes(icaoCode) ? console.log("Airport already included in the fav list") : setFavAirports([...favAirports, icaoCode]);
            console.log("Saved fav airports: ", favAirports)
        }
        catch (error) {
            console.log(error)
        }
    };

    const removeFavAirport = (icaoCode) => {
        try {
            favAirports.splice(favAirports.indexOf(icaoCode), 1)
            console.log("Saved fav airports: ", favAirports)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <AirportsContext.Provider value={{
            favAirports: favAirports,
            setFavAirports: setFavAirports,
            addFavAirport: addFavAirport,
            removeFavAirport: removeFavAirport
        }}>
            {children}
        </AirportsContext.Provider>
    )
}