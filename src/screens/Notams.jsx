import { React, useContext, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";
import AppSubHeader from "../components/AppSubHeader";
import ItemNotams from "../components/ItemNotams";

import { AirportMenu } from "../components/AirportMenu";
import { ThemeContext } from "../contexts/ThemeContext";



const NotamsScreen = () => {
    const { ICAO } = useParams();
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const theme = useContext(ThemeContext);

    const privStyles = StyleSheet.create({
        menuContainer: {
            flex: 1,
            flexDirection: "column-reverse",
            maxHeight: 70,
        }
    });

    return (
        <>
            <View style={{ flex: 1, backgroundColor: theme.colors.appBackground }}>
                <AppSubHeader icaoCode={ICAO} />
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={false} onRefresh={() => { setLastUpdate(new Date()) }} />
                    }
                >
                    <ItemNotams airport={ICAO} refreshDate={lastUpdate} />
                </ScrollView>
            </View>
            <View style={privStyles.menuContainer}>
                <AirportMenu icaoCode={ICAO} />
            </View>
        </>
    );
}

export default NotamsScreen;


