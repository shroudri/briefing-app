import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import theme from '../theme';

export default function MetarList(props) {
  const [metars, setMetars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMetars = async () => {
    try {
      const resp = await fetch(`http://aviationweather.gov/api/data/metar?ids=${props.airport}&format=json&hours=6`);
      const metars = await resp.json();

      setLoading(false);
      setMetars(metars);

    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMetars();
  }, []);

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Recent METARs</Text>
      {loading && <Text>Loading...</Text>}
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