import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native';
import { ImageHome } from '../../assets';

export default class Laporan extends Component {
  render() {
    return (
      <ScrollView style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24, color: 'black' }}>
          Daftar Laporan Anda
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 10, }}>
          <View style={{ marginRight: 15, marginVertical: 10 }}>
            <Image source={ImageHome} style={styles.ImageContent} />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: 'black' }}>
              Jl.Gatot Subroto
            </Text>
            <View style={{ marginTop: 40, flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', color: 'black' }}>
                Status :
              </Text>
              <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', padding: 6, marginHorizontal: 5, marginTop: -6, color: '#FEFEFE', backgroundColor: '#3ceb4f', borderRadius: 20 }}>
                Diajukan
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 15, marginVertical: 10 }}>
            <Image source={ImageHome} style={styles.ImageContent} />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: 'black' }}>
              Jl.Gatot Subroto
            </Text>
            <View style={{ marginTop: 40, flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', color: 'black' }}>
                Status :
              </Text>
              <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', padding: 6, marginHorizontal: 5, marginTop: -6, color: '#FEFEFE', backgroundColor: '#f72f2f', borderRadius: 20 }}>
                DiTolak
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 15, marginVertical: 10 }}>
            <Image source={ImageHome} style={styles.ImageContent} />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', color: 'black' }}>
              Jl.Gatot Subroto
            </Text>
            <View style={{ marginTop: 40, flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', color: 'black' }}>
                Status :
              </Text>
              <Text style={{ fontSize: 16, fontFamily: 'Poppins-Regular', padding: 6, marginHorizontal: 5, marginTop: -6, color: '#FEFEFE', backgroundColor: '#435ef5', borderRadius: 20 }}>
                DiTerima
              </Text>
            </View>
          </View>
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
});
