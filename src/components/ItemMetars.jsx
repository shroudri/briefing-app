import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import theme from '../theme';
import { fetchMetars } from "../apiCalls/apiCalls";

export default function ItemMetars(props) {
  const [metars, setMetars] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    await fetchMetars(props.airport).then((data) => {
      setMetars(data);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    getData();
  }, []);

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
      fontSize: 14,
      margin: 2
  }
})