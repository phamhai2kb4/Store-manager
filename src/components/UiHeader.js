import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'

const UiHeader = (props) => {
    const { title, onPress , fullname} = props
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.left} onPress={onPress}>
                <Image style={styles.img} source={require('../assets/svg/getting-1.png')} />
                <View style={styles.viewUser}>
                    <Text style={styles.txt1}>{title}</Text>
                    <Text style={styles.txt2}>{fullname}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.right} >
                <Image style={styles.bell} source={require("../assets/svg/bell.png")} />
            </TouchableOpacity>
        </View>

    )
}
export default UiHeader

const styles = StyleSheet.create({
    header: {
        //backgroundColor: "#4D96FF",
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        height: 60
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 100,
        //backgroundColor: "#fff",
        flexDirection: "row",
    },
    left: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 10,
    },
    viewUser: {
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: "column"
    },
    txt1: {
        //color: "white",
        fontWeight: "bold",
        fontSize: 18
    },
    txt2: {
        //color: "white",
        fontSize: 16
    },
    right: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginEnd: 10
    },
    bell: {
        width: 30,
        height: 30,
    }
})