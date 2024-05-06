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
        }, cells: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        }
    })

    return (
        <View>
            <Text style={privStyles.title}>Runway information</Text>
            <View>

                {data.runways.map((runway) => (
                    <View key={runway.designator}>
                        <Text style={privStyles.subtitle}>{runway.designator}</Text>

                        <Text style={privStyles.paragraph}>Length: {runway.dimension.length.value} m</Text>
                        <Text style={privStyles.paragraph}>True heading: {runway.trueHeading}º</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}