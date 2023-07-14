import { StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar } from 'react-native'
import React from 'react'

const Register = ({navigation}) => {
    return (
        <View>
            <StatusBar barStyle="dark-content" backgroundColor="grey"/>
            <Text style={styles.Text}>Sistem Pelayanan Pelaporan Jalan Rusak</Text>
            <View style={{ marginTop: 15, alignItems: 'center', marginHorizontal: 10,}}>
                <Text style={styles.label}>Nama Lengkap</Text>
                <View style={styles.inputan}>
                    <TextInput
                    style={{ fontSize: 18, paddingHorizontal: 10,color:'black' }}
                    placeholder='Masukkan Nama Lengkap'
                />
                </View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputan}>
                    <TextInput
                    style={{ fontSize: 18, paddingHorizontal: 10,color:'black' }}
                    placeholder='Masukkan Email'
                />
                </View>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputan}>
                    <TextInput
                    style={{ fontSize: 18, paddingHorizontal: 10,color:'black'  }}
                    placeholder='Password'
                />
                </View>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputan}>
                    <TextInput
                    style={{ fontSize: 18, paddingHorizontal: 10,color:'black' }}
                    placeholder='Confirm password'
                />
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{ 
                        fontFamily:'TitiliumWeb-Bold',
                        fontSize: 18, 
                        color: 'white'
                    }}>
                        Daftar
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'TitilliumWeb-Regular', paddingHorizontal: 5,color:'black', fontSize: 15}}>Sudah Punya Akun?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ fontFamily: 'TitilliumWeb-Bold', color: '#6A7FEE', paddingHorizontal: 5, fontSize: 15}}>Masuk</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Register

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
        color: 'black',
        fontSize: 20,
        fontFamily: 'TitilliumWeb-Bold'
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