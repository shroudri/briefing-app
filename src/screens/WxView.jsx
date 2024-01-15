import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useParams } from "react-router-native";
import AppSubHeader from "../components/AppSubHeader";
import ItemMetar from "../components/ItemMetar";
import ItemTaf from "../components/ItemTaf";

const WxScreen = () => {
    const { ICAO } = useParams();

    return (
        <>
        <AppSubHeader title={ICAO} />
        <ScrollView>
            <ItemMetar airport={ICAO} />
            <ItemTaf airport={ICAO} />
        </ScrollView>
        </>
    );
}

export default WxScreen;