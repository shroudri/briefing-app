import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import {  redirect, useNavigate }  from 'react-router-native';
import { Card, Button, Icon } from '@rneui/themed';


import theme from '../theme';

export default function AirportQuickCard(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const fetchData = async () => {
        try {
            const resp = await fetch(`http://aviationweather.gov/api/data/metar?ids=${props.airport}&format=json`);
            const data = await resp.json();
            setLoading(false);
            const newLastMetar = [...data]; // Empty
            newLastMetar.push(data[0]);
            setData(newLastMetar)
        }
        catch (error) {
            console.log(error);
        }

    };
  
    useEffect(() => {
      fetchData();
    }, []);

    return (
        <TouchableOpacity onPress={() => navigate("/search/" + props.airport)}>
            <Card>
                <Text style={ privStyles.text }>{props.airport}</Text>
                {loading && <Text>Loading...</Text>}
                {data && <Text>{data.rawOb}</Text>}
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