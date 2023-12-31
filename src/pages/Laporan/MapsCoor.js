import React, { Component } from 'react'
import { StyleSheet, Text, PermissionsAndroid, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
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
            isLoading: true,
            lokasi: '',
        }
    }
    componentDidMount() {
        this.requestLocationPermission()
    }
    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Ijin Akses Lokasi',
                    message: 'Ijinkan Akses Lokasi untuk mendeteksi titik koordinat anda.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location Diijinkan');
                Geolocation.getCurrentPosition(info => {
                    this.setState({ userLocation: info }),
                        this.getLokasi(info.coords.latitude, info.coords.longitude)
                });
                this.setState({ isLoading: false })
            } else {
                console.log('Location Tidak Diijinkan');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    getLokasi = (Lat, Long) => {
        const baseUrl = 'https://nominatim.openstreetmap.org/reverse?format=json';
        const apiUrl = `${baseUrl}&lat=${Lat}&lon=${Long}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.display_name) {
                    const address = data.display_name;
                    // console.log('Alamat:', address);
                    this.setState({ lokasi: address })
                } else {
                    console.log('Gagal mendapatkan alamat.');
                }
            })
            .catch(error => console.error('Error:', error));
    }
    render() {

        return (
            <View>
                {
                    this.state.isLoading ? (
                        <View style={{ flex: 1, alignItems: 'center', marginTop: '50%' }}>
                            <ActivityIndicator size={'large'} color='#6A7FEE' />
                            <Text style={{ marginTop: '2%', color: 'black' }}>Memuat Map</Text>
                        </View>
                    ) : (
                        <View>
                            <View style={styles.container}>
                                <MapView
                                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                    style={styles.map}
                                    region={{
                                        latitude: this.props.route.params && this.props.route.params.marker ? Number(this.props.route.params.marker.latitude) : this.state.userLocation.coords.latitude,
                                        longitude: this.props.route.params && this.props.route.params.marker ? Number(this.props.route.params.marker.longitude) : this.state.userLocation.coords.longitude,
                                        latitudeDelta: 0.005,
                                        longitudeDelta: 0.0021,
                                    }}
                                >
                                    <Marker
                                        pinColor={'#6A7FEE'}
                                        key={'user'}
                                        coordinate={{
                                            latitude: this.props.route.params && this.props.route.params.marker ? Number(this.props.route.params.marker.latitude) : this.state.userLocation.coords.latitude,
                                            longitude: this.props.route.params && this.props.route.params.marker ? Number(this.props.route.params.marker.longitude) : this.state.userLocation.coords.longitude
                                        }}
                                        title={this.props.route.params && this.props.route.params.marker ? this.props.route.params.marker.lokasi : 'Lokasi Saya'}
                                    />
                                </MapView>
                            </View>
                            <ScrollView  style={{ backgroundColor: 'white', padding: '5%' }}>
                                <View style={{ flexDirection: 'row', marginBottom: 10, }}>
                                    <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black', paddingEnd: '26%' }}>Lokasi </Text>
                                    <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black', paddingEnd: 20 }}>:</Text>
                                    <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black' }}>{this.props.route.params && this.props.route.params.marker ? this.props.route.params.marker.lokasi : this.state.lokasi}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 20, }}>
                                    <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black', paddingEnd: '23%' }}>Latitude </Text>
                                    <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black', paddingEnd: 20 }}>:</Text>
                                    <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black' }}>{this.props.route.params && this.props.route.params.marker ? this.props.route.params.marker.latitude : this.state.userLocation.coords.latitude}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                    <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black', paddingEnd: '21%' }}>Longitude</Text>
                                    <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black', paddingEnd: 20 }}>:</Text>
                                    <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 16, color: 'black' }}>{this.props.route.params && this.props.route.params.marker ? this.props.route.params.marker.longitude : this.state.userLocation.coords.longitude}</Text>
                                </View>
                                {
                                    !this.props.route.params &&
                                    <TouchableOpacity style={styles.btn}
                                        onPress={() => this.props.navigation.navigate('LaporanNew', {
                                            dataCoor: this.state.userLocation.coords,
                                            lokasi: this.state.lokasi,
                                        })}>
                                        <Text style={{
                                            fontFamily: 'TitiliumWeb-Bold',
                                            fontSize: 18,
                                            color: 'white'
                                        }}>
                                            Simpan Koordinat
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </ScrollView>
                        </View>
                    )
                }
            </View>
        )
    }
}

export default MapsCoor
const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        height: '50%',
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