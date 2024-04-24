import { Card, Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';


export default function NotamQuickCard({ notam }) {
    const swap_datestamp = (date) => {
        if (date.includes("PERM")) {
            return date
        } else {
            let [month, day, year] = date.split('/');
            return `${day}/${month}/${year}`

        }
    }

    const getOnlyDate = (date) => {
        let dateOnly = date.split(' ');
        return `${dateOnly[0]}`
    }

    const getNotamMessage = (notam) => {
        try {
            let message_slice1 = notam.icaoMessage.split('E) ')[1]
            let message_fully_sliced = message_slice1.split('F) ')[0]
            let message_without_line_breaks = message_fully_sliced.replaceAll('\n', ' ')
            let message_with_apostrophes = message_without_line_breaks.replaceAll('&apos;', "'")
            return message_with_apostrophes
        } catch (error) {
            return notam.traditionalMessageFrom4thWord.replaceAll('&apos;', "'")
        }
    }

    const privStyles = StyleSheet.create({
        container: {
            flex: 1,
            marginBottom: 5,
            marginTop: 0,
            marginHorizontal: 0,
            padding: 5
        },
        headerContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignContent: 'center'
        },
        verticalContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
        }
    })

    return (
        <Card containerStyle={privStyles.container}>
            <View style={privStyles.headerContainer}>
                <View style={privStyles.verticalContainer}>
                    <Text style={{ fontWeight: 'bold' }}>{notam.notamNumber}</Text>
                    <Text>Issued: {getOnlyDate(swap_datestamp(notam.issueDate))}</Text>
                </View>
                <View style={privStyles.verticalContainer}>
                    <Text>Start date: {swap_datestamp(notam.startDate)}</Text>
                    <Text>End date: {swap_datestamp(notam.endDate)}</Text>
                </View>
            </View>
            <Card.Divider style={{ margin: 0 }} />
            <View >
                <Text>{getNotamMessage(notam)}</Text>

            </View>
        </Card>
    )



}