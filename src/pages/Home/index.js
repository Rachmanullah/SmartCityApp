import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator
} from 'react-native';
import { IconRefesh, ImageHome } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      daftarMarker: [],
      Token: '',
      isLoading: true,
    }
  }
  async componentDidMount() {
    try {
      const Token = await AsyncStorage.getItem('Token');
      if (Token) {
        this.setState({ Token: JSON.parse(Token) });
        this.getMaker()
      }
    } catch (error) {
      console.log(error);
    }
    const backAction = () => {
      BackHandler.exitApp()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }
  getMaker = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await fetch('http://rachmanullah-001-site1.dtempurl.com/api/laporan', {
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
      console.log(error)
    }
  }


  render() {
    return (
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <Image source={ImageHome} style={styles.ImageHome} />
        <View>
          <View style={{ marginTop: 10, marginHorizontal: 20 }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 24,
                color: 'black',
                textAlign: 'center',
              }}>
              Sistem Pelayanan Pelaporan Jalan Rusak
            </Text>
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 20 }}>
            <Text
              style={{
                fontFamily: 'TitilliumWeb-Regular',
                fontSize: 15,
                textAlign: 'center',
                color: 'black'
              }}>
              Aplikasi pelaporan masyarakat yang dapat digunakan untuk
              melaporkan jalan rusak. Pengguna dapat mengambil foto jalan rusak,
              menandai lokasi, dan mengirimkan laporan melalui aplikasi. Laporan
              tersebut akan diteruskan kepada pihak berwenang yang bertanggung
              jawab.
            </Text>
          </View>
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
          <View style={{ paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%' }}>
              <Text style={{ fontSize: 20, fontFamily: 'Poppins-ExtraBold', color: 'black' }}>
                Daftar Jalan Rusak
              </Text>
              <TouchableOpacity style={{
                backgroundColor: '#6A7FEE',
                alignItems: 'center',
                padding: 10,
                marginTop: -5,
                borderRadius: 10,
              }}
                onPress={() => this.getMaker()}
              >
                <Image source={IconRefesh} style={{ height: 20, width: 20 }} />
              </TouchableOpacity>
            </View>
            {
              this.state.isLoading ?
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <ActivityIndicator size={'large'} color='#6A7FEE' />
                  <Text style={{ marginTop: '2%', color: 'black' }}>Memuat Konten</Text>
                </View>
                :
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
                    </View>
                  </TouchableOpacity>
                ))
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  ImageHome: {
    borderRadius: 20,
    marginTop: windowHeight / 13,
    marginHorizontal: 10,
    width: windowWidth - 20,
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
    overflow: 'hidden',
  },
  ImageContent: {
    borderRadius: 20,
    width: 100,
    height: 80,
  }
});
