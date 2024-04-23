import { Icon } from '@rneui/themed';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigate } from "react-router-native";




export function AirportMenu({ icaoCode }) {
    const navigate = useNavigate();

    const privStyles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderWidth: 1,
            borderColor: "#909090",
            maxHeight: 60,
            padding: 10
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
        }
    })

    return (
        <View style={privStyles.container}>
            <TouchableOpacity style={privStyles.menuItem} onPress={() => navigate(`/weather/${icaoCode}`)}>
                <Icon name="cloud" type="material" size={30} color="#000000" />
                <Text>Weather</Text>
            </TouchableOpacity>
            <View style={privStyles.verticalLine}></View>
            <TouchableOpacity style={privStyles.menuItem} onPress={() => navigate(`/notams/${icaoCode}`)}>
                <Icon name="subject" type="material" size={30} color="#000000" />
                <Text>Notams</Text>
            </TouchableOpacity>
        </View >
    );
}