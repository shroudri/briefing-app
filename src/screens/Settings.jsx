import React, {useContext} from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';


import { SettingsContext } from '../contexts/SettingsContext';
import theme from '../theme';

export default function Settings() {
    let UserSettings = useContext(SettingsContext);
    let textSize = UserSettings.textSize
    console.log("UserSettings text Size: ", textSize)

    const handleTextSizeChange = (value) => {
        // Slider returns array. In order to avoid errors, we need to get value[0]
        console.log("Value: ", value[0])
        UserSettings.setTextSize(value[0])
    }

    const privStyles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            margin: 10,
            marginTop: 5
        },
        header: {
            fontWeight: 'bold',
            fontSize: 19
        },
        h2: {
            fontWeight: 'bold',
            fontSize: UserSettings.textSize * 1.2,
            marginTop: 10
        }
    })

    return (
        <View style={privStyles.container}>
            <Text style={privStyles.header}>Settings</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black', marginTop: 5}} />
            </View>

            {/* TEXT SIZE SETTINGS */}
            <Text style={privStyles.h2}>Text size</Text>
            <View>
                <Slider
                    minimumValue={10}
                    maximumValue={25}
                    step={1}
                    value={textSize}
                    onValueChange={handleTextSizeChange}
                />
                <Text style={{fontSize: UserSettings.textSize}}>Value: {UserSettings.textSize}</Text>
            </View>
        </View>
    );
}
