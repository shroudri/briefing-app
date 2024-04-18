import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';


import Slider from '@react-native-community/slider';

import { SettingsContext } from '../contexts/SettingsContext';
import theme from '../theme';

export default function Settings() {
    const UserSettings = useContext(SettingsContext);
    console.log(UserSettings)


    const handleTextSizeChange = (value) => {
        UserSettings.setTextSize(value)
    }

    return (
        <View style={privStyles.container}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>Settings</Text>
            <Text style={{fontSize: 15}}>Text Size: {UserSettings.textSize}</Text>
            <Slider
                //style={{ marginLeft: 10, marginRight: 10 }}
                minimumValue={10}
                maximumValue={25}
                step={1}
                onValueChange={handleTextSizeChange}
            />

        </View>
    );
}

const privStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        margin: 10,
        marginTop: 5
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18
    }
})