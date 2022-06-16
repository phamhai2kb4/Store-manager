import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from "react-native"
import { Icons, Colors, Fontsizes } from "../../../constants/index"
import Icon from 'react-native-vector-icons/FontAwesome'
function Fivestars(props) {
    const { numberOfStars } = props
    return <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginEnd: 5
    }}>
        {[0, 1, 2, 3, 4].map(item => <Icon name="star"
            key={`${item}`}
            style={{
                flexDirection: 'row',
                marginEnd: 2
            }}
            size={8}
            color={item <= numberOfStars - 1 ? Colors.sucsess : Colors.placeholder} />
            )}
    </View>
}
export default Fivestars