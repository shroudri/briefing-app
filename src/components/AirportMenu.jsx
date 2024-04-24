import { Icon } from '@rneui/themed';
import { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigate } from "react-router-native";
import { ThemeContext } from '../contexts/ThemeContext';




export function AirportMenu({ icaoCode, activeTab }) {
    const navigate = useNavigate();
    const theme = useContext(ThemeContext);

    const privStyles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderWidth: 1,
            borderColor: theme.colors.airportCardBorderColor,
            maxHeight: 60,
            padding: 10,
            backgroundColor: theme.colors.airportMenuBackground
        },
        menuItem: {
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
        },
        verticalLine: {
            height: '100%',
            width: 1,
            backgroundColor: '#909090',
        },
        paragraphText: {
            color: theme.colors.paragraphText
        }
    })

    return (
        <View style={privStyles.container}>
            <TouchableOpacity style={privStyles.menuItem} onPress={() => navigate(`/weather/${icaoCode}`)}>
                <Icon name="cloud" size={30} color={activeTab === "weather" ? theme.colors.airportMenuIcons : "grey"} />
                <Text style={privStyles.paragraphText}>Weather</Text>
            </TouchableOpacity>
            <View style={privStyles.verticalLine}></View>
            <TouchableOpacity style={privStyles.menuItem} onPress={() => navigate(`/notams/${icaoCode}`)}>
                <Icon name="subject" type="material" size={30} color={activeTab === "notams" ? theme.colors.airportMenuIcons : "grey"} />
                <Text style={privStyles.paragraphText}>Notams</Text>
            </TouchableOpacity>
        </View >
    );
}