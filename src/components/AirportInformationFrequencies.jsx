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
        subtitle: {
            fontWeight: theme.text.contentTitle.fontWeight,
            fontSize: UserSettings.textSize,
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

    // console.log(data.frequencies) // Remove when done with frequencyTypes setup
    const frequencyTypes = {
        0: "Approach",
        5: "Delivery",
        6: "Departure",
        7: "FIS",
        9: "Ground",
        12: "Unicom",
        13: "Radar",
        14: "Tower",
        15: "Info",
        17: "Other"
    }

    return (
        <View>
            <Text style={privStyles.title}>Frequencies</Text>
            {data.frequencies.map((frequency) => (
                <View key={frequency.value}>
                    <Text style={privStyles.subtitle}>{frequencyTypes[frequency.type]} ({frequency.name})</Text>
                    <Text style={privStyles.paragraph}>{frequency.value}</Text>
                </View>
            ))}
        </View>
    );
}