import React from 'react';
import { useState } from 'react';
import { Input } from '@rneui/themed';
import {  redirect, useNavigate }  from 'react-router-native';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';


const SearchInputLabel = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  // Define conditions to validate input
  const inputValidationSchema = yup.object().shape({
    inputValue: yup
      .string()
      .required("This field can't be empty")
      .min(4, ({ min }) => `ICAO code must have at least ${min} characters`)
      .max(4, ({ max }) => `ICAO code must have a maximum of ${max} characters`)
  });

  const handlePress = () => {
    // Validate input
    inputValidationSchema
      .validate({ inputValue })
      .then(() => {
        // If validated, redirect to results page
        const url = "/search/" + inputValue.toUpperCase();
        navigate(url);
      })
      .catch((error) => {
        console.error(error.message);
      });
    }

  return (
    <Input
      placeholder='Airport ICAO code'
      onChangeText={setInputValue}
      rightIcon={{ 
        type: 'material-icons', 
        name: 'search',
        onPress: handlePress
      }}
      validationSchema={inputValidationSchema}
      containerStyle={{margin: 0}}
    />
  );
};

export default SearchInputLabel;

