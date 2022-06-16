import React from "react";
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
const HeaderDetail = (props) => {
    const { onPressLeft, title, name, onPressRight, skip, icon } = props
    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
        }}>
            <TouchableOpacity
                style={{
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 5
                }}
                onPress={onPressLeft}>
                <Icon name={name} size={25} />
            </TouchableOpacity>
            <View style={{flex:1}}/>
            <View style={{

            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold"
                }}>{title}</Text>
            </View>
            <View style={{flex:1}}/>
            <TouchableOpacity
                style={{
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 5
                }}
                onPress={onPressRight}>
                {icon ? <Icon name={icon} color='red' size={25} /> : <Text>{skip}</Text>}
            </TouchableOpacity>
        </View>
    )
}
export default HeaderDetail
