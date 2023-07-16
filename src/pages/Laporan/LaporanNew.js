import { ScrollView, StyleSheet, Text, TouchableOpacity, PermissionsAndroid, View, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconCamera, IconCompas } from '../../assets'
import { useRoute } from '@react-navigation/native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown'
import Modal from "react-native-modal";

const LaporanNew = ({ navigation }) => {
    const route = useRoute()
    const [Latitude, setLatitude] = useState('')
    const [Longitude, setLongitude] = useState('')
    const [ImageCamera, setImageCamera] = useState('')
    const dataKerusakan = ["Ringan", "Sedang", "Parah"]
    const [modal, setModal] = useState(false)
    const option = {
        mediaType: 'photo',
        quality: 1
    }

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
                        setImageCamera(data.uri)
                        console.log(data)
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
                setImageCamera(data.uri)
                console.log(data)
            }
        })
    }

    useEffect(() => {
        if (route.params) {
            console.log(route.params.dataCoor)
            setLatitude(JSON.stringify(route.params.dataCoor.latitude))
            setLongitude(JSON.stringify(route.params.dataCoor.longitude))
        }
    })

    return (
        <ScrollView>
            <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, marginTop: 10, color: 'black' }}>
                    Foto Jalan
                </Text>
                <View style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderRadius: 20,
                    borderColor: 'black',
                    borderWidth: 2,
                    backgroundColor: '#c7c7c5',
                    width: 100,
                    height: 100,
                }}>
                    <Image source={ImageCamera != '' ? { uri: ImageCamera } : IconCamera}
                        style={{
                            height: ImageCamera != '' ? 95 : 50,
                            width: ImageCamera != '' ? 95 : 50,
                            marginTop: ImageCamera != '' ? 0 : '25%',
                            borderRadius: ImageCamera != '' ? 20 : 0,
                        }} />
                </View>
                <View style={{ height: 100, width: 100, alignSelf: 'center', }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            marginTop: 10,
                            borderRadius: 20,
                            // borderColor: 'black',
                            paddingVertical: 20,
                            // borderWidth: 2,
                            backgroundColor: '#6A7FEE',
                        }}
                        onPress={() => setModal(true)}
                    >
                        <Text style={{ fontSize: 16, fontFamily: 'TitilliumWeb-Bold', color: 'white' }}>Upload</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Modal isVisible={modal}>
                        <View style={{ backgroundColor: '#ffffff', padding: 20, }}>
                            <Text style={{ fontSize: 16, fontFamily: 'TitilliumWeb-Bold', textAlign: 'center',color: 'black' }}>Pilih Action</Text>
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
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, marginTop: 10, color: 'black' }}>
                    Koordinat
                </Text>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={styles.inputan}>
                        <TextInput
                            style={{ fontSize: 18, color: 'black', paddingHorizontal: 10 }}
                            value={Latitude}
                            placeholder='Latitude'
                            editable={false}
                        />
                    </View>
                    <View style={styles.inputan}>
                        <TextInput
                            style={{ fontSize: 18, color: 'black', paddingHorizontal: 10 }}
                            value={Longitude}
                            placeholder='Longitude'
                            editable={false}
                        />
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: '#6A7FEE',
                        alignItems: 'center',
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 10,
                    }}
                        onPress={() => navigation.navigate('MapsCoor')}
                    >
                        <Image source={IconCompas} style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, marginTop: 10, color: 'black' }}>
                    Alamat Lokasi
                </Text>
                <View style={{
                    width: '100%',
                    height: 53,
                    backgroundColor: '#c7c7c5',
                    marginTop: 10,
                    marginRight: 10,
                    borderColor: 'black',
                    borderWidth: 2,
                    shadowColor: 'black',
                    shadowOpacity: 100,
                    shadowRadius: 10,
                    elevation: 10,
                }}>
                    <TextInput
                        style={{ fontSize: 18, color: 'black', paddingHorizontal: 10 }}
                        placeholder='Posisi Lokasi'
                        onChange={(email) => setEmail(email)}
                    />
                </View>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, marginTop: 10, color: 'black' }}>
                    Keterangan
                </Text>
                <View style={{
                    width: '100%',
                    height: 53,
                    backgroundColor: '#c7c7c5',
                    marginTop: 10,
                    marginRight: 10,
                    borderColor: 'black',
                    borderWidth: 2,
                    shadowColor: 'black',
                    shadowOpacity: 100,
                    shadowRadius: 10,
                    elevation: 10,
                }}>
                    <TextInput
                        style={{ fontSize: 18, color: 'black', paddingHorizontal: 10 }}
                        placeholder='Keterangan'
                        onChange={(email) => setEmail(email)}
                    />
                </View>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, marginTop: 10, color: 'black', }}>
                    Status
                </Text>
                <SelectDropdown
                    data={dataKerusakan}
                    buttonTextStyle={{ fontFamily: 'TitilliumWeb-Bold' }}
                    buttonStyle={{
                        width: '100%',
                        height: 53,
                        backgroundColor: '#c7c7c5',
                        marginTop: 10,
                        borderColor: 'black',
                        borderWidth: 2,
                        shadowColor: 'black',
                        shadowOpacity: 100,
                        shadowRadius: 10,
                        elevation: 10,
                    }}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                />
                <TouchableOpacity style={styles.btn}>
                    <Text style={{
                        fontFamily: 'TitiliumWeb-Bold',
                        fontSize: 18,
                        color: 'white'
                    }}>
                        Laporkan
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default LaporanNew

const styles = StyleSheet.create({
    inputan: {
        width: '40%',
        height: 53,
        backgroundColor: '#c7c7c5',
        marginTop: 10,
        marginRight: 10,
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