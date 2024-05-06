import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CountryFlag from "react-native-country-flag";
import { SettingsContext } from '../contexts/SettingsContext';
import { ThemeContext } from '../contexts/ThemeContext';



export default function AirportInformationGeneral({ data }) {
    const UserSettings = useContext(SettingsContext);
    const theme = useContext(ThemeContext);

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
        flag: {
            alignSelf: 'center',
            marginLeft: 5
        }
    })

    const frequencyTypes = {
        0: "Approach",
        9: "Ground",
        17: "Other"
    }

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={privStyles.title}>{data.name}</Text>
                <CountryFlag isoCode={data.country} size={UserSettings.textSize} style={privStyles.flag} />
            </View>
            {/* <Text>Country: {data.country}</Text> */}
            <Text>Elevation: {Math.round(data.elevation.value * 3.28084)} ft</Text>
            <Text>Runways: {data.runways.length / 2}</Text>
            <Text>Sunrise: {data.runways.length / 2}</Text>

        </View>
    );
}