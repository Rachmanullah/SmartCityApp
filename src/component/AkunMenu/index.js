import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const AkunMenu = () => {
    const navigation = useNavigation();
  return (
      <View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Personal Data')}>
              <Text style={styles.labelButton}>Personal Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
              <Text style={styles.labelButton}>PoinKu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.labelButton}>Logout</Text>
          </TouchableOpacity>
      </View>
  )
}

export default AkunMenu

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 10,
        marginVertical: 15,
        backgroundColor: '#6A7FEE',
        borderRadius: 10,
    },
    labelButton: {
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 20,
        color: 'white',
        padding: 20,
    },
})