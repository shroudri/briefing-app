import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchMetars } from "../apiCalls/apiCalls";

import { SettingsContext } from '../contexts/SettingsContext';
import { ThemeContext } from '../contexts/ThemeContext';

export default function ItemMetars(props) {
  const UserSettings = useContext(SettingsContext);
  const [metars, setMetars] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const historyHours = UserSettings.historyHours
  const theme = useContext(ThemeContext);

  const getData = async () => {
    await fetchMetars(props.airport, historyHours).then((data) => {
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
      <Text style={styles.title}>Recent METARs</Text>
      {isLoading && <Text style={{ color: theme.colors.paragraphText }}>Loading...</Text>}
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

