import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import theme from '../theme';

export default function ItemMetar(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch(`http://aviationweather.gov/api/data/metar?ids=${props.airport}&format=json&hours=6`);
    const data = await resp.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Recent METARs</Text>
      {loading && <Text>Loading...</Text>}
      {data && (
        data.map((item) => (
          <View key={item.metar_id}>
            <Text>{item.rawOb}</Text>
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