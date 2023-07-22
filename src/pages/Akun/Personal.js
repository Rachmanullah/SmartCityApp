import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ImageHome } from '../../assets'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';


const Personal = () => {
    const url = 'https://2a48-149-113-27-150.ngrok-free.app/assets/storange/image_user/'
    const [isLoading, setIsLoading] = useState(true);
    const [nama, setNama] = useState(null)
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [alamat, setAlamat] = useState(null)
    const [foto,setFoto] = useState(null)
    useEffect(() => {
        const getData = async () => {
            try {
                await AsyncStorage.getItem('dataUser').then((storedData) => {
                    const{nama,username,email,alamat,foto} = JSON.parse(storedData)
                    setNama(nama)
                    setUsername(username)
                    setEmail(email)
                    setAlamat(alamat)
                    setFoto(foto)
                    console.log(storedData);
                    setIsLoading(false)
                })
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, []);
    return (
        <ScrollView>
            {
                isLoading ? (
                    <ActivityIndicator style={{ marginTop: '50%' }} size={'large'} color='#6A7FEE'/>
                ) : (
                    <View>
                        <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }}>
                                <Image source={{ uri: url+foto }} style={{ borderRadius: 60, width: 120, height: 120 }} />
                        </TouchableOpacity>
                        <View style={{ marginTop: 15, alignItems: 'center', marginHorizontal: 20 }}>
                            <Text style={styles.label}>Nama Lengkap</Text>
                            <View style={styles.inputan}>
                                <TextInput
                                    style={{ fontSize: 18, paddingHorizontal: 10, color: 'black' }}
                                    placeholder='Masukkan Nama Lengkap'
                                    onChangeText={(nama) => setNama(nama)}
                                    value={nama}
                                />
                            </View>
                            <Text style={styles.label}>Username</Text>
                            <View style={styles.inputan}>
                                <TextInput
                                    style={{ fontSize: 18, paddingHorizontal: 10, color: 'black' }}
                                    placeholder='Masukkan Username'
                                    onChangeText={(username) => setUsername(username)}
                                    value={username}
                                />
                            </View>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputan}>
                                <TextInput
                                    style={{ fontSize: 18, paddingHorizontal: 10, color: 'black' }}
                                    placeholder='Masukkan Email'
                                    inputMode='email'
                                    onChangeText={(Email) => setEmail(Email)}
                                    value={email}
                                />
                            </View>
                            <Text style={styles.label}>Alamat</Text>
                            <View style={styles.inputan}>
                                <TextInput
                                    style={{ fontSize: 18, paddingHorizontal: 10, color: 'black' }}
                                    placeholder='Alamat'
                                    onChangeText={(Alamat) => setAlamat(Alamat)}
                                    value={alamat}
                                />
                            </View>
                            <TouchableOpacity style={styles.btn} onPress={() => ubah()}>
                                <Text style={{
                                    fontFamily: 'TitiliumWeb-Bold',
                                    fontSize: 18,
                                    color: 'white'
                                }}>
                                    Ubah
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default Personal

const styles = StyleSheet.create({
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
        width: '100%',
        height: 53,
        borderRadius: 100,
        shadowColor: 'black',
        shadowOpacity: 100,
        shadowRadius: 10,
        elevation: 10,
        overflow: 'hidden'
    }
})