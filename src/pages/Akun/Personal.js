import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput,PermissionsAndroid, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ImageHome } from '../../assets'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";

const Personal = ({ navigation }) => {
    const url = 'https://d61f-149-113-49-105.ngrok-free.app/assets/storange/image_user/'
    const [Token, setToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [modal, setModal] = useState(false)
    const [id, setId] = useState(null)
    const [nama, setNama] = useState(null)
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [alamat, setAlamat] = useState(null)
    const [foto, setFoto] = useState(null)
    const option = {
        mediaType: 'photo',
        quality: 1
    }
    useEffect(() => {
        const getData = async () => {
            try {
                await AsyncStorage.getItem('dataUser').then((storedData) => {
                    const { id, nama, username, email, alamat, foto } = JSON.parse(storedData)
                    const fotos = {
                        uri: url+foto,
                        type: 'image/'+foto.split('.').pop(),
                        name: foto,
                    }
                    setId(id)
                    setNama(nama)
                    setUsername(username)
                    setEmail(email)
                    setAlamat(alamat)
                    setFoto(fotos)
                    // console.log(storedData);
                })
                await AsyncStorage.getItem('Token').then((Token) => {
                    const getToken = JSON.parse(Token)
                    setToken(getToken)
                })
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, []);

    const openCamera = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                launchCamera(option, (resp) => {
                    if (resp.didCancel) {
                        console.log('User Cancelled Image Picker')
                    } else if (resp.errorCode) {
                        console.log(resp.errorMessage)
                    } else {
                        const data = resp.assets[0]
                        setFoto(data)
                        setModal(false)
                    }
                })
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const openGallery = () => {
        launchImageLibrary(option, (resp) => {
            if (resp.didCancel) {
                console.log('User Cancelled Image Picker')
            } else if (resp.errorCode) {
                console.log(resp.errorMessage)
            } else {
                const data = resp.assets[0]
                setFoto(data)
                setModal(false)
            }
        })
    }
    function updateDataUser() {
        try {
            setIsLoading(true)
            const formData = new FormData();
            formData.append('nama', nama);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('alamat', alamat);
            formData.append('foto', {
                uri: foto.uri,
                type: foto.type, // contoh: 'image/jpeg' atau 'image/png'
                name: 'user_photo.jpg', // Nama berkas yang akan digunakan di server
            });
            fetch('https://d61f-149-113-49-105.ngrok-free.app/api/update/' + id, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + Token
                },
                body: formData,
            })
                .then((Response) => Response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if (responseJson) {
                        const dataUser = JSON.stringify(responseJson.data)
                        AsyncStorage.setItem('dataUser', dataUser)
                        setIsLoading(false)
                        return navigation.navigate('MainApp', { screen: 'Akun' })
                    } else {
                        return console.log(responseJson.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false)
                });
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return (
        <ScrollView>
            {
                isLoading ? (
                    <ActivityIndicator style={{ marginTop: '50%' }} size={'large'} color='#6A7FEE' />
                ) : (
                    <View>
                        <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }} onPress={() => setModal(true)}>
                            <Image source={foto} style={{ borderRadius: 60, width: 120, height: 120 }} />
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
                            <TouchableOpacity style={styles.btn} onPress={() => updateDataUser()}>
                                <Text style={{
                                    fontFamily: 'TitiliumWeb-Bold',
                                    fontSize: 18,
                                    color: 'white'
                                }}>
                                    Ubah
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Modal isVisible={modal}>
                                <View style={{ backgroundColor: '#ffffff', padding: 20, }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'TitilliumWeb-Bold', textAlign: 'center', color: 'black' }}>Pilih Action</Text>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <TouchableOpacity
                                            style={{
                                                alignItems: 'center',
                                                marginTop: 10,
                                                borderRadius: 20,
                                                borderColor: 'black',
                                                padding: 20,
                                                marginHorizontal: 10,
                                                borderWidth: 2,
                                                backgroundColor: '#6A7FEE',
                                            }}
                                            onPress={() => openCamera()}
                                        >
                                            <Text style={{ fontSize: 16, fontFamily: 'TitilliumWeb-Bold' }}>Camera</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                alignItems: 'center',
                                                marginTop: 10,
                                                borderRadius: 20,
                                                borderColor: 'black',
                                                padding: 20,
                                                marginHorizontal: 10,
                                                borderWidth: 2,
                                                backgroundColor: '#6A7FEE',
                                            }}
                                            onPress={() => openGallery()}
                                        >
                                            <Text style={{ fontSize: 16, fontFamily: 'TitilliumWeb-Bold' }}>Gallery</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={{ alignItems: 'center', marginTop: 10, }} onPress={() => setModal(false)}>
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-Regular', color: 'black' }}>Nanti</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
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