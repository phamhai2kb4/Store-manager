import React from "react"
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5'
function SettingItem(props) {
    const { title1, icon1, title, icon, onPress } = props
    return <TouchableOpacity
        onPress={onPress}
        style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 10,
            justifyContent: "center",
            alignItems: "center"
        }}>
        <View style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Icon name={icon} size={25} style={{
                marginEnd: 10,
                opacity: 0.5
            }} />
        </View>

        <View style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 80,
            borderBottomWidth: 1,
            borderBottomColor: "#f2f2f2",
            paddingVertical: 5
        }}>
            <Text style={{
                fontSize: 16,
            }}>{title}</Text>
            <View style={{ flex: 1 }} />
            <Text style={{
                opacity: 0.5
            }}>{title1}</Text>
            <Icon name={icon1} size={22} style={{
                paddingStart: 10,
                opacity: 0.5,
                fontSize: 14
            }} />
        </View>


    </TouchableOpacity>
}
export default SettingItem