import { StyleSheet, Text, View, Image,TouchableOpacity,TextInput,ScrollView } from 'react-native'
import React from 'react'
import { ImageHome } from '../../assets'

const Personal = () => {
    return (
        <ScrollView style={{ marginTop: 20 }}>
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }}>
                <Image source={ImageHome} style={{ borderRadius: 60, width: 120, height: 120 }} />
            </TouchableOpacity>
            <View style={{ marginTop: 15, alignItems: 'center', marginHorizontal: 20 }}>
                <Text style={styles.label}>Nama Lengkap</Text>
                <View style={styles.inputan}>
                    <TextInput
                        style={{ fontSize: 18, paddingHorizontal: 10 }}
                        placeholder='Masukkan Nama Lengkap'
                    />
                </View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputan}>
                    <TextInput
                        style={{ fontSize: 18, paddingHorizontal: 10 }}
                        placeholder='Masukkan Email'
                    />
                </View>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputan}>
                    <TextInput
                        style={{ fontSize: 18, paddingHorizontal: 10 }}
                        placeholder='Password'
                    />
                </View>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputan}>
                    <TextInput
                        style={{ fontSize: 18, paddingHorizontal: 10 }}
                        placeholder='Confirm password'
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => prosesLogin()}>
                    <Text style={{
                        fontFamily: 'TitiliumWeb-Bold',
                        fontSize: 18,
                        color: 'white'
                    }}>
                        Ubah
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Personal

const styles = StyleSheet.create({
    label: {
        alignSelf: 'flex-start',
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