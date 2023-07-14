import React, { Component } from 'react'
import { StyleSheet, Text, PermissionsAndroid, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export class MapsCoor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: {
                "coords": {
                    "accuracy": 0,
                    "altitude": 0,
                    "heading": 0,
                    "latitude": 0,
                    "longitude": 0,
                    "speed": 0
                },
                "extras": {
                    "networkLocationType": "cell"
                },
                "mocked": false,
                "timestamp": 0
            },
        }
    }
    componentDidMount() {
        this.requestLocationPermission()
        Geolocation.getCurrentPosition(info => console.log(info));
    }
    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Ijin Akses Lokasi',
                    message:
                        'Tes',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location Diijinkan');
                Geolocation.getCurrentPosition(info => this.setState({ userLocation: info }));
            } else {
                console.log('Location Tidak Diijinkan');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    render() {
        return (
            <View >
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: this.state.userLocation.coords.latitude,
                            longitude: this.state.userLocation.coords.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.0021,
                        }}
                    >
                        <Marker
                            pinColor={'#6A7FEE'}
                            key={'user'}
                            coordinate={{
                                latitude: this.state.userLocation.coords.latitude,
                                longitude: this.state.userLocation.coords.longitude
                            }}
                            title={'Lokasi Saya'}
                        />
                    </MapView>
                </View>
                <ScrollView style={{ backgroundColor: 'white', padding: '5%' }}>
                    <View style={{ flexDirection: 'row', marginBottom: 20, }}>
                        <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black', paddingEnd: '23%' }}>Latitude </Text>
                        <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black', paddingEnd: 20 }}>:</Text>
                        <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black' }}>{this.state.userLocation.coords.latitude}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black', paddingEnd: '20%' }}>Longitude</Text>
                        <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black', paddingEnd: 20 }}>:</Text>
                        <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black' }}>{this.state.userLocation.coords.longitude}</Text>
                    </View>
                    <TouchableOpacity style={styles.btn} 
                    onPress={() => this.props.navigation.navigate('LaporanNew', { 
                        dataCoor: this.state.userLocation.coords
                        })}>
                        <Text style={{
                            fontFamily: 'TitiliumWeb-Bold',
                            fontSize: 18,
                            color: 'white'
                        }}>
                            Simpan Koordinat
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

export default MapsCoor
const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        height: '70%',
        width: '100%',
        // justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
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
        elevation: 3,
        overflow: 'hidden'
    }
});