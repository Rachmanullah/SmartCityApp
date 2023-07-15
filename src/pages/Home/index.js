import React, { Component, useEffect } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import { ImageHome } from '../../assets';

export default class Home extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
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
              Aplikasi pelaporan berbasis masyarakat yang dapat digunakan untuk
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
            <Text style={{ fontSize: 20, fontFamily: 'Poppins-ExtraBold', color: 'black' }}>
              Daftar Jalan Rusak
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 15, marginVertical: 10 }}>
                <Image source={ImageHome} style={styles.ImageContent} />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: 'black' }}>Jl.Gatot Subroto</Text>
                <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', color: 'black' }}>Kerusakan : Sedang</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 15, marginVertical: 10 }}>
                <Image source={ImageHome} style={styles.ImageContent} />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: 'black' }}>Jl.Gatot Subroto</Text>
                <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', color: 'black' }}>Kerusakan : Sedang</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 15, marginVertical: 10 }}>
                <Image source={ImageHome} style={styles.ImageContent} />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: 'black' }}>Jl.Gatot Subroto</Text>
                <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', color: 'black' }}>Kerusakan : Sedang</Text>
              </View>
            </View>
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
    marginTop: '10%',
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
    width: 150,
    height: 100,
  }
});
