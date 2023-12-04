import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import theme from '../theme';

export default function ItemTaf(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch(`https://aviationweather.gov/api/data/taf?ids=${props.airport}&format=json`);
    const data = await resp.json();
    setData(data);
    setLoading(false);
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.rawTAF}</Text>
      </View>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <View style={styles.container}>
          <Text style={styles.title}>Current TAF</Text>
            {loading && <Text>Loading...</Text>}
            {data && (
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.tafId.toString()}
              />
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