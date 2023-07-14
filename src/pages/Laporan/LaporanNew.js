import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native'
import React from 'react'
import { IconCamera, IconCompas } from '../../assets'

const LaporanNew = ({navigation}) => {
    return (
        <ScrollView>
            <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, marginTop: 10,color: 'black' }}>
                    Foto Jalan
                </Text>
                <TouchableOpacity style={{
                    alignItems: 'center',
                    marginTop: 10,
                    borderRadius: 20,
                    borderColor: 'black',
                    padding: 50,
                    borderWidth: 2,
                    backgroundColor: '#c7c7c5',
                }}>
                    <Image source={IconCamera} style={{ height: 50, width: 50 }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, marginTop: 10,color: 'black' }}>
                    Koordinat
                </Text>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={styles.inputan}>
                        <TextInput
                            style={{ fontSize: 18, color: 'black', paddingHorizontal: 10 }}
                            placeholder='Latitude'
                            onChange={(email) => setEmail(email)}
                        />
                    </View>
                    <View style={styles.inputan}>
                        <TextInput
                            style={{ fontSize: 18, color: 'black', paddingHorizontal: 10 }}
                            placeholder='Longitude'
                            onChange={(email) => setEmail(email)}
                        />
                    </View>
                    <TouchableOpacity style={{ 
                        backgroundColor: '#6A7FEE', 
                        alignItems: 'center', 
                        marginTop: 10, 
                        padding: 10, 
                        borderRadius: 10, }}
                        onPress={() => navigation.navigate('Maps')}
                        >
                        <Image source={IconCompas} style={{ height: 30, width: 30 }} />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, marginTop: 10,color: 'black' }}>
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
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, marginTop: 10,color: 'black' }}>
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
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 18, marginTop: 10,color: 'black', }}>
                    Status
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
                        placeholder='Status'
                        onChange={(email) => setEmail(email)}
                    />
                </View>
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