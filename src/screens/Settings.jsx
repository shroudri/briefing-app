import React, {useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import { Switch } from '@rneui/themed';


import { SettingsContext } from '../contexts/SettingsContext';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Settings() {
    const theme = useContext(ThemeContext);
    let UserSettings = useContext(SettingsContext);

    console.log(UserSettings)

    const privStyles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.appBackground,
            padding: 10
        },
        header: {
            fontWeight: 'bold',
            fontSize: 17,
            textAlign: 'center',
            color: theme.colors.paragraphText
        },
        h2: {
            fontWeight: 'bold',
            fontSize: UserSettings.textSize * 1.2,
            marginTop: 10,
            color: theme.colors.paragraphText
        }
    })

    return (
        <View style={privStyles.container}>
            <Text style={privStyles.header}>SETTINGS</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: theme.colors.paragraphText, marginTop: 5}} />
            </View>


            {/* THEME SETTINGS */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
            <Text style={privStyles.h2}>Enable dark theme</Text>
            <Switch
                color={theme.colors.sliderMinimumTrackTintColor}
                value={UserSettings.darkMode}
                onValueChange={(value) => UserSettings.setDarkMode(value)}
                />
            </View>
            
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 0.5, backgroundColor: theme.colors.paragraphText}} />
            </View>
            


            {/* TEXT SIZE SETTINGS */}
            <Text style={privStyles.h2}>Text size</Text>
            <View >
                <Slider
                    minimumValue={10}
                    maximumValue={25}
                    minimumTrackTintColor={theme.colors.sliderMinimumTrackTintColor}
                    maximumTrackTintColor={theme.colors.sliderMaximumTrackTintColor}
                    step={1}
                    value={UserSettings.textSize}
                    onValueChange={(value) => UserSettings.setTextSize(value[0])}
                />
                <Text style={{fontSize: UserSettings.textSize, color: theme.colors.paragraphText}}>Value: {UserSettings.textSize}</Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 0.7, backgroundColor: theme.colors.paragraphText, marginTop: 5}} />
                </View>
            </View>   


            {/* HISTORIC METAR SETTINGS */}
            <Text style={privStyles.h2}>Metar history</Text>
            <View>
                <Slider
                    minimumValue={1}
                    maximumValue={24}
                    minimumTrackTintColor={theme.colors.sliderMinimumTrackTintColor}
                    maximumTrackTintColor={theme.colors.sliderMaximumTrackTintColor}
                    step={1}
                    value={UserSettings.historyHours}
                    onValueChange={(value) => UserSettings.setHours(value[0])}
                />
                <Text style={{fontSize: UserSettings.textSize, color: theme.colors.paragraphText}}>{UserSettings.historyHours} {UserSettings.historyHours > 1 ? "hours" : "hour"}</Text>
            </View>



        </View>
        
    );
}
