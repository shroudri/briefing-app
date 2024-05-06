import { React, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppSubHeader from "../components/AppSubHeader";

import { AirportMenu } from "../components/AirportMenu";
import { ThemeContext } from "../contexts/ThemeContext";

import { useRoute } from '@react-navigation/native';

import { fetchOpenAipAirportData, fetchOpenAipAirportId } from "../apiCalls/apiCalls";
import AirportInformationFrequencies from "../components/AirportInformationFrequencies";
import AirportInformationGeneral from "../components/AirportInformationGeneral";
import AirportInformationRunways from "../components/AirportInformationRunways";


export default function AirportInformationScreen({ navigation }) {
    const route = useRoute();
    const ICAO = route.params.airport
    const theme = useContext(ThemeContext);
    const [airportData, setAirportData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const privStyles = StyleSheet.create({
        menuContainer: {
            flex: 1,
            flexDirection: "column-reverse",
            alignContent: "flex-start",
        }
    })


    const getData = async () => {
        const id = await fetchOpenAipAirportId(ICAO)
        const data = await fetchOpenAipAirportData(id)
        if (data) {
            setAirportData(data)
            setIsLoading(false)
        } else {
            console.log("Airport data not found")
        }
    }

    useEffect(() => {
        getData();
    }, []);


    // Should have general information, runways and frequencies
    return (
        <>
            <View style={{ flex: 11, backgroundColor: theme.colors.appBackground }}>
                <AppSubHeader icaoCode={ICAO} />
                {isLoading && <Text>Loading...</Text>}

                {airportData &&
                    <ScrollView style={{ margin: 5 }}>
                        <AirportInformationGeneral data={airportData} />
                        <AirportInformationRunways data={airportData} />
                        <AirportInformationFrequencies data={airportData} />
                    </ScrollView>
                }

            </View>
            <View style={privStyles.menuContainer}>
                <AirportMenu icaoCode={ICAO} activeTab="airportInformation" navigation={navigation} />
            </View>
        </>
    );
}