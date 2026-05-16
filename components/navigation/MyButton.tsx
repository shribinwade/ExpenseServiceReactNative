import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const MyButton = ({title,onPress}) => {
  return (
    <View style={{width:"100%"}}>
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
};


export default MyButton;

const styles= StyleSheet.create({
  button:{
    backgroundColor:"black", 
    padding:10,
    borderRadius:10,
    paddingInline:50,
    paddingVertical:15,
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center"
  },
  text:{
    textAlign:"center",
    color:"white",
    fontSize:16,
    fontWeight:"bold"
  }
})