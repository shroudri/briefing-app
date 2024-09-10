import { useContext } from 'react';
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CountryFlag from "react-native-country-flag";
import { SettingsContext } from '../contexts/SettingsContext';
import { ThemeContext } from '../contexts/ThemeContext';



export default function AirportInformationGeneral({ data }) {
    const UserSettings = useContext(SettingsContext);
    const theme = useContext(ThemeContext);

    let coordinates = data.geometry.coordinates
    let reverseCoordinates = [coordinates[1], coordinates[0]]

    const url = Platform.select({
        ios: `maps:0,0?q=${reverseCoordinates}`,
        android: `geo:0,0?q=${reverseCoordinates}`,
    })

    const privStyles = StyleSheet.create({
        title: {
            fontWeight: theme.text.contentTitle.fontWeight,
            fontSize: UserSettings.textSize * 1.2,
            color: theme.colors.paragraphText
        },
        paragraph: {
            // fontSize: theme.text.contentParagraph.fontSize
            fontSize: UserSettings.textSize,
            color: theme.colors.paragraphText,
            margin: 2
        },
        link: {
            fontStyle: 'italic',
        },
        flag: {
            alignSelf: 'center',
            marginLeft: 5
        }
    })



    return (
        <View>
            <View style={{ flexDirection: 'row', maxWidth: "100vw" }}>
                <Text style={privStyles.title}>{data.name}</Text>
                <CountryFlag isoCode={data.country} size={UserSettings.textSize} style={privStyles.flag} />
            </View >
            {/* <Text>Country: {data.country}</Text> */}
            <TouchableOpacity onPress={() => { Linking.openURL(url) }}>
                <Text style={[privStyles.paragraph, privStyles.link]}>View in Maps</Text>
            </TouchableOpacity>
            <Text style={privStyles.paragraph}>Elevation: {Math.round(data.elevation.value * 3.28084)} ft</Text >
            <Text style={privStyles.paragraph}>Runways: {data.runways.length / 2}</Text>

        </View >
    );
}