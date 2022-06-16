import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'

const FeatureItem = (props) =>{
    const { title, img } = props
    return (
        
        <TouchableOpacity style={{
            height: 100,
            width: 100,
            marginBottom: 5,
            borderRadius: 20,
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Image source={img}
                resizeMode="contain"
                style={{
                    width: 20,
                    height: 20,
                }}
            />
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}
export default FeatureItem