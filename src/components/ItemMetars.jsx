import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import theme from '../theme';
import { fetchMetars } from "../apiCalls/apiCalls";

import { SettingsContext } from '../contexts/SettingsContext';

export default function ItemMetars(props) {
  const userSettings = useContext(SettingsContext);
  const [metars, setMetars] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const getData = async () => {
    await fetchMetars(props.airport, 3).then((data) => {
      setMetars(data);
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
        fontSize: theme.text.contentTitle.fontSize
    },
    paragraph: {
        // fontSize: theme.text.contentParagraph.fontSize
        fontSize: userSettings.textSize,
        margin: 2
    }
  })

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Recent METARs</Text>
      {isLoading && <Text>Loading...</Text>}
      {metars && (
        metars.map((item) => (
          <View key={item.metar_id}>
            <Text style={styles.paragraph}>{item.rawOb}</Text>
          </View>
        ))
      )}
    </View>
  )

}

