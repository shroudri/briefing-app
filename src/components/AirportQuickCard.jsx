import { useNavigation } from '@react-navigation/native';
import { Card } from '@rneui/themed';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { fetchMetars } from '../apiCalls/apiCalls';


import { SettingsContext } from '../contexts/SettingsContext';
import { ThemeContext } from '../contexts/ThemeContext';

export default function AirportQuickCard({ airport }) {
    const [metar, setMetar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const UserSettings = useContext(SettingsContext);
    const theme = useContext(ThemeContext);
    const navigation = useNavigation();



    const getData = async () => {
        try {
            const data = await fetchMetars(airport, 0);
            setMetar(data[0].rawOb);
            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    const privStyles = StyleSheet.create({
        cardContainer: {
            backgroundColor: theme.colors.airportCardBackground,
            borderColor: theme.colors.airportCardBorderColor,
            borderRadius: 7
        },
        headerText: {
            fontWeight: theme.text.contentTitle.fontWeight,
            fontSize: UserSettings.textSize * 1.1,
            color: theme.colors.paragraphText
        },
        metarText: {
            fontSize: UserSettings.textSize,
            color: theme.colors.paragraphText
        }
    })

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Weather", { airport: airport })}>
            <Card containerStyle={privStyles.cardContainer}>
                <Text style={privStyles.headerText}>{airport}</Text>
                {isLoading && <Text style={privStyles.metarText}>Loading...</Text>}
                {metar && <Text style={privStyles.metarText}>{metar}</Text>}
            </Card>
        </TouchableOpacity >
    )
}

