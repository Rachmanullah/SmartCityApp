import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { ImageHome } from '../../assets'
import { AkunMenu } from '../../component'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Akun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foto: [],
      isLoading: true,
    }
  }

  async componentDidMount() {
    try {
      const storedData = await AsyncStorage.getItem('dataUser');
      if (storedData) {
        const { foto } = JSON.parse(storedData);
        this.setState({ foto: foto });
      } else {
        console.log('Data user tidak ditemukan di AsyncStorage');
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={{ paddingHorizontal: 10, paddingTop: windowHeight / 20 }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: 'http://rachmanullah-001-site1.dtempurl.com/assets/storange/image_user/' + this.state.foto }} style={styles.imageProfile} />
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
