import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react';
import { Input } from '@rneui/themed';
import {  redirect, useNavigate }  from 'react-router-native';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';


const SearchBar = (props) => {
  const barValue = props.barValue;
  const setBarValue = props.setBarValue;
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        console.error(error.message);
      });
    }

  return (
    <>
      <Input
        placeholder='Airport ICAO code'
        onChangeText={setBarValue}
        rightIcon={{ 
          type: 'material-icons', 
          name: 'search',
          onPress: handlePress
        }}
        validationSchema={inputValidationSchema}
        containerStyle={{margin: 0}}
        errorStyle={ privStyles.errorText }
        errorMessage={error}
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

