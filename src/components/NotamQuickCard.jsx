import { Card, Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

export default function NotamQuickCard({ notam }) {
    const swap_datestamp = (date) => {
        let [month, day, year] = date.split('/');
        return `${day}/${month}/${year}`
    }


    return (
        <Card containerStyle={{ marginTop: 15 }}>
            <Card.Title>NOTAMS</Card.Title>
            <View>
                <Text>{notam.notamNumber}</Text>
                <Text>Issued: {swap_datestamp(notam.issueDate)}</Text>
            </View>
            <Card.Divider />
            <Text>Start date: {swap_datestamp(notam.startDate)}</Text>
            <Text>End date: {swap_datestamp(notam.endDate)}</Text>
            <Card.Divider />

            <Text>{notam.traditionalMessageFrom4thWord}</Text>
        </Card>
    )
}