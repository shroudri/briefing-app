import { createContext, useState } from 'react';

// Crear el contexto
export const AirportsContext = createContext();

// Crear el Provider
export function AirportsContextProvider({ children }) {
    const [favAirports, setFavAirports] = useState([]);

    const addFavAirport = (icaoCode) => {
        try {
            favAirports.includes(icaoCode) ? console.log("Airport already included in the fav list") : favAirports.push(icaoCode);
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