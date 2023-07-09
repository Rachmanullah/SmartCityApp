import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Login = ({navigation}) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const prosesLogin = () => {
        if (email == "" && password == "" || email == "" || password == "") {
            console.warn("Isi Email dan Password !!!")
        }else{
            navigation.navigate('Home')
        }
    }
    return (
        <View>
            <Text style={styles.Text}>Sistem Pelayanan Pelaporan Jalan Rusak</Text>
            <View style={{ marginTop: 150, alignItems: 'center'}}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputan}>
                    <TextInput
                    style={{ fontSize: 18, paddingHorizontal: 10}}
                    placeholder='Masukkan Email'
                    onChange={(email) => setEmail(email)}
                />
                </View>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputan}>
                    <TextInput
                    style={{ fontSize: 18, paddingHorizontal: 10  }}
                    placeholder='Password'
                     onChange={(password) => setPassword(password)}
                />
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => prosesLogin()}>
                    <Text style={{ 
                        fontFamily:'TitiliumWeb-Bold',
                        fontSize: 18, 
                        color: 'white'
                    }}>
                        Masuk
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'TitilliumWeb-Regular', paddingHorizontal: 5, fontSize: 15}}>Belum Punya Akun?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ fontFamily: 'TitilliumWeb-Bold', color: '#6A7FEE', paddingHorizontal: 5, fontSize: 15}}>Daftar</Text>
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
    label:{
        alignSelf: 'flex-start',
        marginHorizontal: 25,
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Bold'
    },
    inputan: {
        width: 350,
        height: 53,
        backgroundColor: 'white',
        marginTop: 10,
        margin: 15,
        borderColor: '#7a42f4',
        borderWidth: 2,
        shadowColor: 'black',
        shadowOpacity: 100,
        shadowRadius: 10,
        elevation: 10,
    },
    btn:{
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