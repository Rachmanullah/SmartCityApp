import React, { Component } from 'react';
import {
    View,
    Image
} from 'react-native';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Akun, Home, Laporan, LaporanNew, Login, MapsCoor, Personal, Register, Splash } from '../../pages';
import { IconAkun, IconAkunActive, IconHome, IconHomeActive, IconLaporan, IconLaporanActive } from '../../assets';
import Maps from '../../pages/Maps';

const MaterialBottom = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainApp = () => {
    return (
        <MaterialBottom.Navigator
            shifting={false}
            initialRouteName="Home"
            barStyle={{ backgroundColor: '#6A7FEE' }}
            activeColor='#FEFEFE'
            inactiveColor='#040404'
        >
            <MaterialBottom.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{ marginTop: -4 }}>
                            {
                                color == "#FEFEFE" ?
                                    <Image source={IconHomeActive} style={{ height: 30, width: 30 }} /> :
                                    <Image source={IconHome} style={{ height: 30, width: 30 }} />
                            }
                        </View>
                    )
                }}
            />
            <MaterialBottom.Screen name="Laporan" component={Laporan}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{ marginTop: -4 }}>
                            {
                                color == "#FEFEFE" ?
                                    <Image source={IconLaporanActive} style={{ height: 30, width: 30 }} /> :
                                    <Image source={IconLaporan} style={{ height: 30, width: 30 }} />
                            }
                        </View>
                    )
                }}
            />
            <MaterialBottom.Screen name="Akun" component={Akun}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View style={{ marginTop: -4 }}>
                            {
                                color == "#FEFEFE" ?
                                    <Image source={IconAkunActive} style={{ height: 30, width: 30 }} /> :
                                    <Image source={IconAkun} style={{ height: 30, width: 30 }} />
                            }
                        </View>
                    )
                }}
            />
        </MaterialBottom.Navigator>
    )
}

const MyStack = () => {
    return (
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
            <Stack.Screen name='MainApp' component={MainApp} options={{ git headerShown: false }} />
            <Stack.Screen name="Personal Data" component={Personal} options={{ headerShown: true }} />
            <Stack.Screen name="Maps" component={Maps} options={{ headerShown: true }} />
            <Stack.Screen name='LaporanNew' component={LaporanNew} options={{ headerShown: true, title: 'Buat Laporan' }} />
            <Stack.Screen name='MapsCoor' component={MapsCoor} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

export default class index extends Component {
    render() {
        return (
            <NavigationContainer>
                <MyStack />
            </NavigationContainer>
        );
    }
}