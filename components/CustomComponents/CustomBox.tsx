import { View, Text, StyleSheet, TextStyle, StyleProp } from 'react-native'
import React from 'react'
import { Box } from '../ui/box'

type CustomBoxProps = {
    style?: {
        
        mainBox?: object
        shadowBox?: object
        styles?: object
    }
    children?: React.ReactNode
    [key: string]: any
}

const CustomBox = ({ style = {}, children, ...props }: CustomBoxProps) => {
    return (
        <View style={{ width: "100%" }} {...props}>
            <Box style={[

                styles.headingContainer, 
                {
                  borderColor:
                    (style.mainBox as any)?.borderColor || 'black',
                  backgroundColor:
                    (style.mainBox as any)?.backgroundColor || 'black',
                }, 
                style.mainBox, style.styles
                ]} >

                <View >{children}</View>
            
            </Box>


            <Box style={[

                styles.shadowContainer, 
                {
                backgroundColor: (style:any) => style.shadowBox?.backgroundColor || 'gray'
                },

                style.shadowBox
                ]}>
            </Box>
        </View>
    )
}

export default CustomBox

const styles = StyleSheet.create({
    headingContainer: {
        padding: 10,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        position: "relative",
        backgroundColor: "black"
    },
    textColor: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    shadowContainer: {
        position: "absolute",
        top: 5,
        left: 5,
        right: -5,
        bottom: -5,
        zIndex: -1,
        backgroundColor: "gray"
    },

});

