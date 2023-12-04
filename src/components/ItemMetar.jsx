import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import axios from 'axios';
import theme from '../theme'

import SampleResponseMetars from "../../templates/responseMetars";
import fetchMetars from "../apiCalls/fetchMetars";

const ItemMetar = (props) => {
    const metars = SampleResponseMetars;
    const historicMetars = metars.slice(1);

    if ( props.onlyCurrent){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Current METAR</Text>
                <Text style={styles.paragraph}>{array_metars[0].rawOb}</Text>
            </View>
        )
    } else if ( props.onlyHistoric) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Historic METARs</Text>
                { historicMetars.map((item) => (
                    <View key={item.metar_id}>
                        <Text>{item.rawOb}</Text>
                    </View>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        fontWeight: theme.text.contentTitle.fontWeight,
        fontSize: theme.text.contentTitle.fontSize
    },
    paragraph: {
        fontSize: theme.text.contentParagraph.fontSize
    }
})

export default ItemMetar