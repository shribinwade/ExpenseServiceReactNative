
import React, { ReactNode } from 'react'
import { Text,  StyleSheet, TextStyle, StyleProp, TextProps } from 'react-native';

type CustomTextProps = TextProps & {
  style?: {
    styles?: StyleProp<TextStyle>
  };
  children: ReactNode;
  [key: string]: any
}

const CustomText = ({style={},children, ...props}:CustomTextProps) => {
  return (
        <Text style={[styles.text,style.styles,style]} {...props}>
             {children}
        </Text>
  )
}

export default CustomText

const styles = StyleSheet.create({

    text: {
        color: 'black',
        fontFamily: 'Helvetica'
    },
 

})
