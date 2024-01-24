import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import theme from '../theme';

export default function TafList(props) {
  const [taf, setTaf] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTaf = async () => {
    const resp = await fetch(`https://aviationweather.gov/api/data/taf?ids=${props.airport}&format=json`);
    const taf = await resp.json();

    setTaf(taf);
    setLoading(false);
  };

  useEffect(() => {
    fetchTaf();
  }, []);

  const humanizeTaf = (taf) => {
    const keywords = ["TEMPO", "BECMG", "RMK"];
    var words = taf.split(" ");

    for (var i = 0; i < words.length; i++) {
      // Handle BECMG - only if not precluded by prob
      if (keywords.includes(words[i]) && (!words[i - 1].includes("PROB"))) {
        words[i] = '\n  ' + words[i];
      // Handle PROB30 BECMG
      } else if (words[i].includes("PROB") && (keywords.includes(words[i + 1]))) {
        words[i] = '\n  ' + words[i];
      }

    }
    return words.join(' ');
  }



  return(
    <View style={styles.container}>
      <Text style={styles.title}>Current TAF</Text>
      {loading && <Text>Loading...</Text>}
      {taf && (
        taf.map((item) => (
          <View key={item.tafId}>
            <Text>{humanizeTaf(item.rawTAF)}</Text>
          </View>
        ))
      )}
    </View>
  )

  // return (
  //     <View style={styles.container}>
  //         <Text style={styles.title}>Current TAF</Text>
  //           {loading && <Text>Loading...</Text>}
  //           {taf && (
  //             <FlatList
  //               taf={taf}
  //               renderItem={renderItem}
  //               keyExtractor={(item) => item.tafId.toString()}
  //             />
  //           )}
  //     </View>
  // )
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