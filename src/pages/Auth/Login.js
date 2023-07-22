import { Alert, BackHandler, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const saveData = async (data) => {
        try {
            const token = JSON.stringify(data.token)
            const dataUser = JSON.stringify(data.data)
            await AsyncStorage.setItem('dataUser', dataUser)
            await AsyncStorage.setItem('Token', token)
        } catch (e) {
            console.log(e);
        }
    }

    const prosesLogin = () => {
        if (email == "" && password == "" || email == "" || password == "") {
            console.warn("Isi Email dan Password !!!")
        } else {
            fetch('https://2a48-149-113-27-150.ngrok-free.app/api/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            })
                .then((Response) => Response.json())
                .then((responseJson) => {
                    if (responseJson) {
                        console.log(responseJson)
                        saveData(responseJson)
                        setEmail("")
                        setPassword("")
                        return navigation.navigate('MainApp')
                    } else {
                        return Alert.alert('Warning', 'Username Atau Password Salah')
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        const cekToken = async () => {
            AsyncStorage.getItem('Token')
                .then((Token) => {
                    if (Token) {
                        navigation.navigate('MainApp');
                    }
                })
        }
        cekToken();
        const backAction = () => {
            BackHandler.exitApp()
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, [])

    return (
        <View>
            <StatusBar barStyle="dark-content" backgroundColor="grey" />
            <Text style={styles.Text}>Sistem Pelayanan Pelaporan Jalan Rusak</Text>
            <View style={{ marginTop: 150, alignItems: 'center', marginHorizontal: 10, }}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputan}>
                    <TextInput
                        style={{ fontSize: 18, color: 'black', paddingHorizontal: 10 }}
                        placeholder='Masukkan Email'
                        onChangeText={(email) => setEmail(email)}
                        value={email}
                    />
                </View>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputan}>
                    <TextInput
                        style={{ fontSize: 18, color: 'black', paddingHorizontal: 10 }}
                        placeholder='Password'
                        onChangeText={(password) => setPassword(password)}
                        value={password}
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => prosesLogin()}>
                    <Text style={{
                        fontFamily: 'TitiliumWeb-Bold',
                        fontSize: 18,
                        color: 'white'
                    }}>
                        Masuk
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'TitilliumWeb-Regular', paddingHorizontal: 5, fontSize: 15, color: 'black' }}>Belum Punya Akun?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ fontFamily: 'TitilliumWeb-Bold', color: '#6A7FEE', paddingHorizontal: 5, fontSize: 15 }}>Daftar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    Text: {
        fontSize: 30,
        fontFamily: 'Poppins-Bold',
        color: '#6A7FEE',
        marginTop: 40,
        marginHorizontal: 10,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Bold',
        color: 'black'
    },
    inputan: {
        width: '100%',
        height: 53,
        backgroundColor: '#c7c7c5',
        marginTop: 10,
        margin: 15,
        borderColor: 'black',
        borderWidth: 2,
        shadowColor: 'black',
        shadowOpacity: 100,
        shadowRadius: 10,
        elevation: 10,
    },
    btn: {
        backgroundColor: '#6A7FEE',
        marginVertical: 20,
        alignItems: 'center',
        paddingVertical: 15,
        width: 350,
        height: 53,
        borderRadius: 100,
        shadowColor: 'black',
        shadowOpacity: 100,
        shadowRadius: 10,
        elevation: 10,
        overflow: 'hidden'
    }
})