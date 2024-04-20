import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import {  redirect, useNavigate }  from 'react-router-native';
import { Card, Button, Icon } from '@rneui/themed';
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
        try{
            const data = await fetchMetars(props.airport, 0);
            setMetar(data[0].rawOb);
            setIsLoading(false);
        }
        catch(error){
            console.log(error);
        }
    }
  
    useEffect(() => {
      getData();
    }, [props.refresh]);


    const privStyles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 30,
            padding: 10,
            borderSize: 2,
            borderCurveRadius: 5,
            backgroundColor: theme.colors.primary
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
            <Card containerStyle={{ backgroundColor: theme.colors.airportCardBackground, borderColor: theme.colors.airportCardBorderColor }}>
                <Text style={ privStyles.headerText }>{props.airport}</Text>
                {isLoading && <Text>Loading...</Text>}
                {metar && <Text style={ privStyles.metarText }>{metar}</Text>}
            </Card>
        </TouchableOpacity>
    )
}

