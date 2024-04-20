import { Card } from '@rneui/themed';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import { fetchMetars } from '../apiCalls/apiCalls';

import { SettingsContext } from '../contexts/SettingsContext';
import { ThemeContext } from '../contexts/ThemeContext';

export default function AirportQuickCard(props) {
    const [metar, setMetar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const UserSettings = useContext(SettingsContext);
    const theme = useContext(ThemeContext);


    const getData = async () => {
        try {
            const data = await fetchMetars(props.airport, 0);
            setMetar(data[0].rawOb);
            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [props.refresh]);


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
        <TouchableOpacity onPress={() => navigate("/search/" + props.airport)}>
            <Card containerStyle={privStyles.cardContainer}>
                <Text style={privStyles.headerText}>{props.airport}</Text>
                {isLoading && <Text style={privStyles.metarText}>Loading...</Text>}
                {metar && <Text style={privStyles.metarText}>{metar}</Text>}
            </Card>
        </TouchableOpacity>
    )
}

