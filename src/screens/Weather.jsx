import { useNavigation, useRoute } from '@react-navigation/native';
import { React, useContext, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import AppSubHeader from "../components/AppSubHeader";
import ItemMetar from "../components/ItemMetars";
import ItemTaf from "../components/ItemTaf";


import { AirportMenu } from '../components/AirportMenu';
import { ThemeContext } from "../contexts/ThemeContext";

const WeatherScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const ICAO = route.params.airport
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const theme = useContext(ThemeContext);

    const privStyles = StyleSheet.create({
        menuContainer: {
            flex: 1,
            flexDirection: "column-reverse",
            maxHeight: 60,
        }
    });

    return (
        <>
            <View style={{ flex: 11, backgroundColor: theme.colors.appBackground }}>
                <AppSubHeader icaoCode={ICAO} />
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={false} onRefresh={() => { setLastUpdate(new Date()) }} />
                    }
                >
                    <ItemMetar airport={ICAO} refreshDate={lastUpdate} />
                    <ItemTaf airport={ICAO} refreshDate={lastUpdate} />
                </ScrollView>
            </View>
            <View style={privStyles.menuContainer}>
                <AirportMenu icaoCode={ICAO} activeTab="weather" navigation={navigation} />
            </View>
        </>
    );
}

export default WeatherScreen;