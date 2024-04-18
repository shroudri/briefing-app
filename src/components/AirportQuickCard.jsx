import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import {  redirect, useNavigate }  from 'react-router-native';
import { Card, Button, Icon } from '@rneui/themed';
import { fetchMetars } from '../apiCalls/apiCalls';

import theme from '../theme';

export default function AirportQuickCard(props) {
    const [metar, setMetar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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


    return (
        <TouchableOpacity onPress={() => navigate("/search/" + props.airport)}>
            <Card>
                <Text style={ privStyles.text }>{props.airport}</Text>
                {isLoading && <Text>Loading...</Text>}
                {metar && <Text>{metar}</Text>}
            </Card>
        </TouchableOpacity>
    )
}

const privStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        padding: 10,
        borderSize: 2,
        borderCurveRadius: 5,
        borderColor: "#000000",
        backgroundColor: theme.colors.primary
    },
    text: {
        fontWeight: theme.text.contentTitle.fontWeight,
        fontSize: theme.text.contentTitle.fontSize
    }
})