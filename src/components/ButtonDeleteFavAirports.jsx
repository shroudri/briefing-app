import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import theme from '../theme';

export default function ButtonDeleteFavAirports(props) {
    const deleteFavAirportList = async () => {
        try {
            await AsyncStorage.removeItem('userFavAirports');
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }
    const handleStorageDeletionPress = () =>
        Alert.alert(
            'Caution',
            'Are you sure that you want to erase your list of favorites?',
            [
                { text: 'Cancel', style: 'cancel', },
                { text: 'Delete', onPress: () => { deleteFavAirportList(), props.setFavAirportList([]) }, },
            ],
            {
                cancelable: true,
            },
        )

    return (
        <View>
            <TouchableOpacity onPress={handleStorageDeletionPress} style={privStyles.deleteListButton}>
                <Text style={{ color: "#d23c34" }}>Delete all favorites</Text>
            </TouchableOpacity>
        </View>
    )
}




const privStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    deleteListButton: {
        margin: 15,
        padding: 10,
        backgroundColor: "#e5e5e5",
        borderRadius: 5,
        borderWidth: 1
    }
})