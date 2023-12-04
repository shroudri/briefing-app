import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import axios from 'axios';


export default function fetchMetars () {
  const [data, setData] = useState([]);

  const fetchData = () => {
    return axios.get("https://aviationweather.gov/api/data/metar?ids=LEJR&format=json&hours=6")
      .then((response) => setData(response.data));
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    data.map((metar) => (
      <Text key={metar.metar_id}>{metar.rawOb}</Text>
    ))
  );
}


