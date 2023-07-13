import React, { Component } from 'react'
import { StyleSheet, Text, PermissionsAndroid, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export class Maps extends Component {
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
            daftarMarker: [
                {
                    id: 1,
                    title: 'marker 1',
                    coordinate: {
                        latitude: -7.994053296493388,
                        longitude: 112.6339324296401
                    },
                    color: 'cyan'
                },
                {
                    id: 2,
                    title: 'marker 2',
                    coordinate: {
                        latitude: -7.994330484741516,
                        longitude: 112.63563878490491
                    },
                    color: 'yellow'
                }
            ]
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
                Geolocation.getCurrentPosition(info => this.setState({userLocation: info}));
            } else {
                console.log('Location Tidak Diijinkan');
            }
        } catch (err) {
            console.warn(err);
        }
    };
    render() {
        return (
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
                    {
                        this.state.daftarMarker.map((item, index) => (
                            <Marker
                                pinColor={item.color}
                                key={item.id}
                                coordinate={item.coordinate}
                                title={item.title}
                            />
                        ))
                    }

                </MapView>
            </View>
        )
    }
}

export default Maps
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});