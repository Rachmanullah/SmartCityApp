import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { IconNull, IconRefesh, ImageHome } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Laporan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daftarMarker: [],
      user_id: '',
      Token: '',
      isLoading: true,
    }
  }
  async componentDidMount() {
    try {
      const Token = await AsyncStorage.getItem('Token');
      if (Token) {
        this.setState({ Token: JSON.parse(Token) });
      }

      const storedData = await AsyncStorage.getItem('dataUser');
      if (storedData) {
        const { id } = JSON.parse(storedData);
        this.setState({ user_id: id });
        this.getMaker(); // Panggil fungsi getMaker() setelah user_id tersedia
      } else {
        console.log('Data user tidak ditemukan di AsyncStorage');
      }
    } catch (error) {
      console.log(error);
    }
  }

  getMaker = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await fetch('http://rachmanullah-001-site1.dtempurl.com/api/laporan/' + this.state.user_id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Authorization': 'Bearer ' + this.state.Token // Gunakan this.state.Token yang telah disimpan di state
        },
      });

      const responseJson = await response.json();
      if (responseJson.success) {
        this.setState({ daftarMarker: responseJson.data });
        this.setState({ isLoading: false });
      } else {
        console.log(responseJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <ScrollView style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '10%' }}>
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24, color: 'black' }}>
            Daftar Laporan Anda
          </Text>
          <TouchableOpacity style={{
            backgroundColor: '#6A7FEE',
            alignItems: 'center',
            padding: 10,
            borderRadius: 50,
          }}
            onPress={() => this.getMaker()}
          >
            <Image source={IconRefesh} style={{ height: 20, width: 20, }} />
          </TouchableOpacity>
        </View>

        {
          this.state.isLoading ?
            <View style={{ flex: 1, alignItems: 'center', marginTop: '50%' }}>
              <ActivityIndicator size={'large'} color='#6A7FEE' />
              <Text style={{ marginTop: '2%', color: 'black' }}>Memuat Konten</Text>
            </View>
            :
            <View>
              {
                this.state.daftarMarker.length == 0 ? (
                  <View style={{ flex: 1, alignItems: 'center', marginVertical: '50%' }}>
                    <Image source={IconNull} style={{ height: 100, width: 100, }} />
                    <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 15, color: 'black' }}>
                      Anda Belum Mengajukan Laporan
                    </Text>
                  </View>
                ) : (
                  this.state.daftarMarker.map((item, index) => (
                    <TouchableOpacity style={{ flexDirection: 'row' }}
                      key={index}
                      onPress={() => this.props.navigation.navigate('MapsCoor',
                        { marker: item })}>
                      <View style={{ marginRight: 15, marginVertical: 10 }}>
                        <Image source={{ uri: 'http://rachmanullah-001-site1.dtempurl.com/assets/storange/image_laporan/' + item.foto }} style={styles.ImageContent} />
                      </View>
                      <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black' }}>{item.lokasi.substr(0, 25)}</Text>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', color: 'black' }}>Keterangan : {item.keterangan}</Text>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', color: 'black' }}>Kerusakan : {item.kerusakan}</Text>
                        <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', color: 'black' }}>Status : {item.status}</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                )
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
            </View>
        }
      </ScrollView>
    );
  }
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
