import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen';
import Dashboard from './components/Dashboard';
import Onboarding from "./components/Onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Loading = () => (
    <View>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

const RootNavigation = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [viewedOnboarding, setviewedOnboarding] = useState(false);

    const checkOnBoarding = async () => {
        try {
        const value = await AsyncStorage.getItem("@viewedOnboarding");
        if (value !== null) {
            setviewedOnboarding(true);
        } 
        } catch (e) {
        console.log(e);
        }
        finally {
        setIsLoading(false);
        } 
    };

    useEffect(() => {
        checkOnBoarding();
    },[]);

    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false   
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={viewedOnboarding ? "HomeScreen" : "Onboarding"} screenOptions={screenOptions}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Onboarding" component={Onboarding} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation;


