import { React, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useParams } from "react-router-native";
import AppSubHeader from "../components/AppSubHeader";
import MetarList from "../components/MetarList";
import TafList from "../components/TafList";

const Airport = () => {
    const { ICAO } = useParams();

    return (
        <>
        <AppSubHeader icaoCode={ICAO} />
        <ScrollView>
            <MetarList airport={ICAO} />
            <TafList airport={ICAO} />
        </ScrollView>
        </>
    );
}

export default Airport;