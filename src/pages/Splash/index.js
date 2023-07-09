import { View, Text, Image, StyleSheet, ImageBackground, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { BackgroundSplash, Kontraktor } from '../../assets'

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login')
    }, 3000)
  }, [navigation])
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground source={BackgroundSplash} resizeMode="cover" style={styles.image}>
        <Text style={styles.label1}>Helping The Best For The City</Text>
        <Text style={styles.label2}>With Our Service App. We Give Better Service To You</Text>
        <Image source={Kontraktor} style={{ flex: 1, width: 300, height: 300, alignSelf: 'center' }} />
      </ImageBackground>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  label1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    marginTop: 50,
    marginHorizontal: 50,
  },
  label2: {
    fontFamily: 'Poppins-LightItalic',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
    marginHorizontal: 10,
  }
})