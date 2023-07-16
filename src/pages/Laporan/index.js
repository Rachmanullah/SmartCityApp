import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ImageHome } from '../../assets';

export default class Laporan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daftarMarker: [
        {
          id: 1,
          title: 'Jl.Gatot Subroto',
          status: 'Ringan',
          coordinate: {
            latitude: -7.986463982343888,
            longitude: 112.6364327499232
          },
          color: 'cyan'
        },
        {
          id: 2,
          title: 'Jl.KedungKandang',
          status: 'Sedang',
          coordinate: {
            latitude: -7.984824078480216,
            longitude: 112.65654085809507
          },
          color: 'yellow'
        },
        {
          id: 3,
          title: 'Jl.Sawojajar',
          status: 'Parah',
          coordinate: {
            latitude: -7.976718171631598,
            longitude: 112.64561150989431
          },
          color: 'Red'
        }
      ]
    }
  }
  render() {
    return (
      <ScrollView style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24, color: 'black' }}>
          Daftar Laporan Anda
        </Text>
        {
          this.state.daftarMarker.map((item, index) => (
            <TouchableOpacity style={{ flexDirection: 'row' }}
              key={index}
              onPress={() => this.props.navigation.navigate('MapsCoor',
                { marker: item })}>
              <View style={{ marginRight: 15, marginVertical: 10 }}>
                <Image source={ImageHome} style={styles.ImageContent} />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: 'black' }}>{item.title}</Text>
                <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', color: 'black' }}>Kerusakan : {item.status}</Text>
              </View>
            </TouchableOpacity>
          ))
        }
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('LaporanNew')} >
            <Text
              style={{
                fontFamily: 'TitiliumWeb-Bold',
                fontSize: 18,
                color: 'white',
              }}>
              Ajukan Laporan
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ImageContent: {
    borderRadius: 20,
    width: 150,
    height: 100,
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
    elevation: 5,
    overflow: 'hidden',
  },
});
