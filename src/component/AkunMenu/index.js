import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AkunMenu = () => {
    const navigation = useNavigation();
   
    const Logout = async () => {
        try {
            await AsyncStorage.getItem('Token')
                .then((Token) => {
                    console.log(Token);
                    fetch('https://2a48-149-113-27-150.ngrok-free.app/api/logout', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + JSON.parse(Token)
                        }
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);
                            if (responseJson) {
                                console.log(responseJson);
                                AsyncStorage.removeItem('Token');
                                AsyncStorage.removeItem('dataUser');
                                navigation.navigate('Login');
                                // setDataUser('');
                            } else {
                                return Alert.alert('Warning', responseJson.message)
                            }
                        })
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Personal Data')}>
                <Text style={styles.labelButton}>Personal Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.labelButton}>PoinKu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => Logout()}>
                <Text style={styles.labelButton}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AkunMenu

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 10,
        marginVertical: 15,
        backgroundColor: '#6A7FEE',
        borderRadius: 10,
    },
    labelButton: {
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 20,
        color: 'white',
        padding: 20,
    },
})