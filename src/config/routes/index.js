import React, { Component } from 'react';
import {
    View,
    Image
} from 'react-native';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, Register, Splash } from '../../pages';
const MaterialBottom = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name='Splash' component={Splash} options={{ headerShown:false }}/>
            <Stack.Screen name='Login' component={Login} options={{ headerShown:false }}/>
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/>
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

export default class index extends Component {
    render() {
        return (
            <NavigationContainer>
                <MyStack/>
            </NavigationContainer>
        );
    }
}