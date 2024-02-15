import { React, useState, useEffect } from "react";

import { Header, Icon } from "@rneui/base";
import AsyncStorage from '@react-native-async-storage/async-storage';

import useAirports from "../hooks/useAirports";

const AppSubHeader = ( props ) => {
    const [isFav, setIsFav] = useState(false);
    const [favAirportList, setFavAirportList, addFavAirport, removeFavAirport, airportIsInFavList] = useAirports();

    useEffect (() => {
        airportIsInFavList(props.icaoCode).then((result) => {
            setIsFav(result);
        })
    }, [favAirportList]);

    const handlePress = async (icaoCode) => {
      favAirportList.includes(icaoCode) ? removeFavAirport(icaoCode) : addFavAirport(icaoCode);
    }

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