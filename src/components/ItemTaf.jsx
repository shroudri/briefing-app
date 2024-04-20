import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

import theme from '../theme';
import { fetchTaf } from "../apiCalls/apiCalls";
import { SettingsContext } from '../contexts/SettingsContext';
import { ThemeContext } from '../contexts/ThemeContext';

export default function ItemTaf(props) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const UserSettings = useContext(SettingsContext);
  const theme = useContext(ThemeContext);

  const humanizeTaf = (rawTaf) => {
    const keywords = ["TEMPO", "BECMG", "RMK"];
    const separator = " "
    var words = rawTaf.split(" ");

    for (var i = 0; i < words.length; i++) {
      // Handle BECMG - only if not precluded by prob
      if (keywords.includes(words[i]) && (!words[i - 1].includes("PROB"))) {
        words[i] = '\n' + separator + words[i];
      // Handle PROB30 BECMG
      } else if (words[i].includes("PROB") && (keywords.includes(words[i + 1]))) {
        words[i] = '\n' + separator + words[i];
      } else if (words[i].includes("PROB")) {
        words[i] = '\n' + separator + words[i];
      }
    }
    
    return words.join(' ');
  }

  useEffect(() => {
    async function getData() {
        const fetchedData = await fetchTaf(props.airport);
        setData(fetchedData);
        setIsLoading(false);
    }
    getData();
    }, [props.refresh]);

  
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
        fontSize: UserSettings.textSize,
        color: theme.colors.paragraphText
    }
  })

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Current TAF</Text>
      {isLoading && <Text>Loading...</Text>}
      {data && (
        data.map((item) => (
          <View key={item.tafId}>
            <Text style={styles.paragraph}>{humanizeTaf(item.rawTAF)}</Text>
          </View>
        ))
      )}
    </View>
  )
}
