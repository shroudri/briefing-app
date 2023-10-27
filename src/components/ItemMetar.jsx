import React from "react";
import { Text, View, StyleSheet } from "react-native";
import SampleResponseMetars from "../../templates/responseMetars";

import theme from "../theme";

const ItemMetar = (props) => {
    const AllMetars = []

    // Push each raw METAR into the AllMetars array
    {SampleResponseMetars.map((METAR) => (
        AllMetars.push(METAR.rawOb)
    ))}

    // Generate array with historic metars only
    const currentMetar = AllMetars.shift(); // This function returns the first (most recent) metar and deletes it from array
    const historicMetars = AllMetars;       // This function returns all the rest metars 

    if ( props.onlyHistoric === true  ) {
        return (
            <>
            <View style={styles.container}>
                <Text style={styles.title}>Historic metars</Text>
                {historicMetars.map((historicMetar) => (
                    <Text key={historicMetar}>{historicMetar}</Text>
                ))}
            </View>
            </>
        )
    } else {
        return (
            <>
            <View style={styles.container}>
                <Text style={styles.title}>Current METAR</Text>
                <Text style={styles.paragraph}>{currentMetar}</Text>
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