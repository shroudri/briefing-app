import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react';
import { Input } from '@rneui/themed';
import {  redirect, useNavigate }  from 'react-router-native';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import { ThemeContext } from '../contexts/ThemeContext';

const SearchBar = (props) => {
  const barValue = props.barValue;
  const setBarValue = props.setBarValue;
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const [containerHeight, setContainerHeight] = useState(45);

  // Define conditions to validate input
  const inputValidationSchema = yup.object().shape({
    barValue: yup
      .string()
      .required("This field can't be empty")
      .min(4, ({ min }) => `ICAO code must have at least ${min} characters`)
      .max(4, ({ max }) => `ICAO code must have a maximum of ${max} characters`)
  });

  const handlePress = () => {
    // Validate input
    inputValidationSchema
      .validate({ barValue })
      .then(() => {
        // If validated, redirect to results page
        const url = "/search/" + barValue.toUpperCase();
        navigate(url);
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
        placeholder='Airport ICAO code'
        placeholderTextColor={theme.colors.paragraphText}
        onChangeText={setBarValue}
        rightIcon={{ 
          type: 'material-icons', 
          name: 'search',
          color: theme.colors.paragraphText,
          onPress: handlePress
        }}
        validationSchema={inputValidationSchema}
        containerStyle={{marginBottom: 10, maxHeight: containerHeight}}
        errorStyle={ privStyles.errorText }
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

