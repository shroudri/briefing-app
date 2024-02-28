import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import theme from '../theme';
import { fetchTaf } from "../apiCalls/apiCalls";

export default function ItemTaf(props) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Current TAF</Text>
      {isLoading && <Text>Loading...</Text>}
      {data && (
        data.map((item) => (
          <View key={item.tafId}>
            <Text>{humanizeTaf(item.rawTAF)}</Text>
          </View>
        ))
      )}
    </View>
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