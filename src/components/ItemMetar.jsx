import React from "react";
import { Text, View, StyleSheet } from "react-native";
import METAR from "../../templates/presentMetar";
import JSON_METARS from "../../templates/previousMetars";

import theme from "../theme";

const ItemMetar = (props) => {
    const AllMetars = []
    console.log(props)
    // Push each raw METAR into the AllMetars array
    {JSON_METARS.map((METAR) => (
        AllMetars.push(METAR.rawOb)
    ))}


    if ( props.onlyHistoric === true  ) {
        return (
            <>
            <View style={styles.container}>
                <Text style={styles.title}>Historic metars</Text>
                <Text style={styles.paragraph}>{AllMetars[5]}</Text>
            </View>
            </>

        )
    } else {
        return (
            <>
            <View style={styles.container}>
                <Text style={styles.title}>Current METAR</Text>
                <Text style={styles.paragraph}>{AllMetars[0]}</Text>
            </View>
            </>
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