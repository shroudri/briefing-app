import { React, useState, useEffect, useContext } from "react";

import { Header, Icon } from "@rneui/base";
import AsyncStorage from '@react-native-async-storage/async-storage';

import useAirports from "../hooks/useAirports";

import { ThemeContext } from "../contexts/ThemeContext";

const AppSubHeader = ( props ) => {
    const [isFav, setIsFav] = useState(false);
    const [favAirportList, setFavAirportList, addFavAirport, removeFavAirport, airportIsInFavList] = useAirports();
    const theme = useContext(ThemeContext);

    useEffect (() => {
      favAirportList.includes(props.icaoCode) ? setIsFav(true) : setIsFav(false);
    }, [favAirportList, props.icaoCode]);

    const handlePress = async (icaoCode) => {
      favAirportList.includes(icaoCode) ? removeFavAirport(icaoCode) : addFavAirport(icaoCode);
      favAirportList.includes(icaoCode) ? setIsFav(true) : setIsFav(false);
    }

    return (
        <Header
        backgroundColor={theme.colors.appSubHeaderBackground}
        statusBarProps={{ backgroundColor: theme.colors.appHeaderBackground }}
        backgroundImageStyle={{}}
        barStyle="default"
        centerComponent={{
          text: `${props.icaoCode}`,
          style: { color: "#fff", fontWeight: "bold" }
        }}
        linearGradientProps={{}}
        placement="center"
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