import React from "react";
import { Text, View, StyleSheet } from "react-native";
import SampleResponseTafs from "../../templates/responseTaf";

import theme from "../theme";

const ItemTaf = () => {
    return (
        <>
        <View style={styles.container}>
            <Text style={styles.title}>Current TAF</Text>
            <Text style={styles.paragraph}>{SampleResponseTafs[0].rawTAF}</Text>
        </View>
        </>
    )
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

export default ItemTaf