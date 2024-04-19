import React, {useContext} from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';


import { SettingsContext } from '../contexts/SettingsContext';
import theme from '../theme';

export default function Settings() {
    let UserSettings = useContext(SettingsContext);
    console.log(UserSettings)

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
                    value={UserSettings.textSize}
                    onValueChange={(value) => UserSettings.setTextSize(value[0])}
                />
                <Text style={{fontSize: UserSettings.textSize}}>Value: {UserSettings.textSize}</Text>
            </View>


            {/* HISTORIC METAR SETTINGS */}
            <Text style={privStyles.h2}>Metar history</Text>
            <View>
                <Slider
                    minimumValue={1}
                    maximumValue={24}
                    step={1}
                    value={UserSettings.historyHours}
                    onValueChange={(value) => UserSettings.setHours(value[0])}
                />
                <Text style={{fontSize: UserSettings.textSize}}>{UserSettings.historyHours} {UserSettings.historyHours > 1 ? "hours" : "hour"}</Text>
            </View>
        </View>
        
    );
}
