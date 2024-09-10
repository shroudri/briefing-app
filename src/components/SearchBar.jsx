import { Input } from '@rneui/themed';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as yup from 'yup';
import { ThemeContext } from '../contexts/ThemeContext';

import { fetchOpenAipAirportData, fetchOpenAipAirportIdByIATA } from "../apiCalls/apiCalls";

const SearchBar = (props) => {
  const barValue = props.barValue;
  const setBarValue = props.setBarValue;
  const [error, setError] = useState('');
  const theme = useContext(ThemeContext);
  const [containerHeight, setContainerHeight] = useState(45);

  // Define conditions to validate input
  const inputValidationSchema = yup.object().shape({
    barValue: yup
      .string()
      .required("This field can't be empty")
      .min(3, ({ min }) => `ICAO code must have at least ${min} characters`)
      .max(4, ({ max }) => `ICAO code must have a maximum of ${max} characters`)
  });

  useEffect(() => {       // Reset error message when initializing screen or barValue changes
    setError('');
    setContainerHeight(45);
  }, [barValue]);

  const handlePress = async () => {
    // Validate input
    inputValidationSchema
      .validate({ barValue })
      .then(async () => {
        // If validated, redirect to results page
        if (barValue.length === 3) {
          const IATA = barValue.toUpperCase();
          const id = await fetchOpenAipAirportIdByIATA(IATA);
          const airportData = await fetchOpenAipAirportData(id);
          const ICAO = airportData.icaoCode;
          props.navigation.navigate("Weather", { airport: ICAO });
        } else if (barValue.length === 4) {
          const ICAO = barValue.toUpperCase();
          props.navigation.navigate("Weather", { airport: ICAO });
        }
      })
      .catch((error) => {
        setError(error.message);
        setContainerHeight(60);
        console.error(error.message);
      });
  }

  return (
    <>
      <Input
        placeholder='Write airport ICAO'
        placeholderTextColor={theme.colors.paragraphText}
        onChangeText={setBarValue}
        rightIcon={{
          type: 'material-icons',
          name: 'search',
          color: theme.colors.paragraphText,
          size: 30,
          onPress: handlePress
        }}
        validationSchema={inputValidationSchema}
        containerStyle={{ marginBottom: 10, maxHeight: containerHeight }}
        errorStyle={privStyles.errorText}
        errorMessage={error}
        inputStyle={{ color: theme.colors.paragraphText }}
        onSubmitEditing={handlePress}
      />
    </>
  );
};

const privStyles = StyleSheet.create({
  errorText: {
    color: 'red',
    textAlign: 'center'
  }
})

export default SearchBar;

