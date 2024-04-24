import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchNotams } from "../apiCalls/apiCalls";

import { SettingsContext } from '../contexts/SettingsContext';
import { ThemeContext } from '../contexts/ThemeContext';
import NotamQuickCard from './NotamQuickCard';

export default function ItemNotams(props) {
    const UserSettings = useContext(SettingsContext);
    const [notams, setNotams] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const theme = useContext(ThemeContext);

    const getData = async () => {
        await fetchNotams(props.airport).then((data) => {
            setNotams(data);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getData();
    }, [props.refresh]);

    // Styles should be inside the component for them to have access to UserSettingsContext
    const styles = StyleSheet.create({
        container: {
            padding: 10
        },
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
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Airport NOTAMs</Text>
            {isLoading && <Text style={{ color: theme.colors.paragraphText }}>Loading...</Text>}
            {notams && (
                notams.map((item) => (
                    <View key={item.notamNumber}>
                        <NotamQuickCard notam={item} />
                    </View>
                ))
            )}
        </View>
    )

}

