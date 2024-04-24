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
            flexDirection: 'row'
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
                    <Text>Start date: {getOnlyDate(swap_datestamp(notam.startDate))}</Text>
                    <Text>End date: {getOnlyDate(swap_datestamp(notam.endDate))}</Text>
                </View>
            </View>
            <Card.Divider style={{ margin: 0 }} />
            <View >
                <Text>{notam.traditionalMessageFrom4thWord}</Text>

            </View>
        </Card>
    )



}