import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SettingsContext } from '../contexts/SettingsContext';
import { ThemeContext } from '../contexts/ThemeContext';



export default function AirportInformationFrequencies({ data }) {
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

    return (
        <View>
            <Text style={privStyles.title}>Frequencies</Text>
            {data.frequencies.map((frequency) => (
                <View key={frequency.value}>
                    <Text style={{ fontWeight: 'bold' }}>{frequency.name}</Text>
                    <Text>{frequency.value}</Text>
                </View>
            ))}
        </View>
    );
}