import React from "react";
import { View, Text, Button } from "react-native";
import { useParams } from "react-router-native";
import AppSubHeader from "./AppSubHeader";
import ItemMetar from "./ItemMetar";
import ItemTaf from "./ItemTaf";

const AirportScreen = () => {
    const { ICAO } = useParams();

    return (
        <View>
            <AppSubHeader title={ICAO} />
            <ItemMetar />
            <ItemTaf />
            <ItemMetar onlyHistoric />
        </View>
    );
}

export default AirportScreen;