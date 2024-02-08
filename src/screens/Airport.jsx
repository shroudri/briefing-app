import { React, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useParams } from "react-router-native";
import AppSubHeader from "../components/AppSubHeader";
import ItemMetar from "../components/ItemMetars";
import ItemTaf from "../components/ItemTaf";

const Airport = () => {
    const { ICAO } = useParams();

    return (
        <>
        <AppSubHeader icaoCode={ICAO} />
        <ScrollView>
            <ItemMetar airport={ICAO} />
            <ItemTaf airport={ICAO} /> 
        </ScrollView>
        </>
    );
}

export default Airport;