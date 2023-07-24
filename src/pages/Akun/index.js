import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { ImageHome } from '../../assets'
import { AkunMenu } from '../../component'

export default class Akun extends Component {
  render() {
    return (
      <View style={{ paddingHorizontal: 10, paddingTop: windowHeight / 20 }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={ImageHome} style={styles.imageProfile} />
        </View>
        <AkunMenu />
      </View>
    )
  }
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  imageProfile: {
    marginTop: 20,
    marginRight: 10,
    marginBottom: 20,
    borderRadius: 60,
    width: 120,
    height: 120
  },

})
