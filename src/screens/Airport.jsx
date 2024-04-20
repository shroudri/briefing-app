import { React, useState, useContext } from "react";
import { View, Text, Button, ScrollView, RefreshControl } from "react-native";
import { useParams } from "react-router-native";
import AppSubHeader from "../components/AppSubHeader";
import ItemMetar from "../components/ItemMetars";
import ItemTaf from "../components/ItemTaf";

import { ThemeContext } from "../contexts/ThemeContext";

const Airport = () => {
    const { ICAO } = useParams();
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const theme = useContext(ThemeContext);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.appBackground }}>
        <AppSubHeader icaoCode={ICAO} />
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={() => {setLastUpdate(new Date())}} />
            }
        >
            <ItemMetar airport={ICAO} refreshDate={lastUpdate} />
            <ItemTaf airport={ICAO} refreshDate={lastUpdate} /> 
        </ScrollView>
        </View>
    );
}

export default Airport;