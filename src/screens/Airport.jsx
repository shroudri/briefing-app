import { React, useState } from "react";
import { View, Text, Button, ScrollView, RefreshControl } from "react-native";
import { useParams } from "react-router-native";
import AppSubHeader from "../components/AppSubHeader";
import ItemMetar from "../components/ItemMetars";
import ItemTaf from "../components/ItemTaf";

const Airport = () => {
    const { ICAO } = useParams();
    const [lastUpdate, setLastUpdate] = useState(new Date());

    return (
        <>
        <AppSubHeader icaoCode={ICAO} />
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={() => {setLastUpdate(new Date())}} />
            }
        >
            <ItemMetar airport={ICAO} refreshDate={lastUpdate} />
            <ItemTaf airport={ICAO} refreshDate={lastUpdate} /> 
        </ScrollView>
        </>
    );
}

export default Airport;