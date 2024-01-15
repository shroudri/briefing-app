import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';
import SearchInputLabel from '../components/SearchInputLabel';


const InitScreen = () => {
    return (
        <View style={styles.container}>
            <SearchInputLabel />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    }
})


export default InitScreen;