import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {

    const clearStorage = async () => {
        try {
            await AsyncStorage.removeItem('@viewedOnboarding');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <TouchableOpacity onPress={clearStorage}>
                <Text>Clear Storage</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
    }
})