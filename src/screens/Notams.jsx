import { React, useContext, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import AppSubHeader from "../components/AppSubHeader";
import ItemNotams from "../components/ItemNotams";

import { AirportMenu } from "../components/AirportMenu";
import { ThemeContext } from "../contexts/ThemeContext";

import { useRoute } from '@react-navigation/native';


const NotamsScreen = ({ navigation }) => {
    const route = useRoute();
    const ICAO = route.params.airport

    const [lastUpdate, setLastUpdate] = useState(new Date());
    const theme = useContext(ThemeContext);

    const privStyles = StyleSheet.create({
        menuContainer: {
            flex: 1,
            flexDirection: "column-reverse",
            alignContent: "flex-start",
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
                    <ItemNotams airport={ICAO} refreshDate={lastUpdate} />
                </ScrollView>
            </View>
            <View style={privStyles.menuContainer}>
                <AirportMenu icaoCode={ICAO} activeTab="notams" navigation={navigation} />
            </View>
        </>
    );
}

export default NotamsScreen;


