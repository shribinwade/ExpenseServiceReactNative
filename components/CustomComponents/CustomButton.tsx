import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native'
import React from 'react'
import CustomBox from './CustomBox'
import CustomText from './CustomText'

type Event={
  title:string,
  onPress: any;
}

const CustomButton = ({title,onPress}:Event) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}  >
              <CustomBox style={DarkButtonBOX}>
                <CustomText style={{ textAlign: "center", color: 'white' }}>{title}</CustomText>
              </CustomBox>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  buttonContainer:{
    width: '50%',
    paddingHorizontal: 10,
  },
  button: {
    margin: 5,
    width: '50%',
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  }

})

const DarkButtonBOX = {
  mainBox: {
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  shadowBox: {
    backgroundColor: 'gray',
    opacity: 0.5,
    borderRadius: 10
  },

}