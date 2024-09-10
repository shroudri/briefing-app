import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SettingsContext } from '../contexts/SettingsContext';
import { ThemeContext } from '../contexts/ThemeContext';



export default function AirportInformationRunways({ data }) {
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
        }, runway: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: theme.colors.airportInformationRunwayBackgroundColor,
            margin: 3,
            padding: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
        }
    })

    return (
        <View>
            <Text style={privStyles.title}>Runway information</Text>
            <View>

                {data.runways.map((runway) => (
                    <View key={runway.designator} style={privStyles.runway}>
                        <Text style={privStyles.subtitle}>{runway.designator}</Text>

                        <Text style={privStyles.paragraph}>{runway.dimension.length.value}x{runway.dimension.width.value} m</Text>
                        <Text style={privStyles.paragraph}>{runway.trueHeading.toString().padStart(3, '0')}º</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}