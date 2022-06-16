import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput
} from 'react-native'
import { Colors } from '../components/Colors'

const Header = (props) => {
    const { title, image, skip, onChangeText, value} = props
    return (
        <View style={{
        
        }}>
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={styles.txt}>{title}</Text>
                <View style={{ flex: 1 }} />
                <Image source={image} style={styles.img} />
                <Text>{skip}</Text>
            </View>

            <View style={{
                backgroundColor: "#fff",
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 15,
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center"
            }}>
                <TextInput
                    placeholder="Search"
                    placeholderTextColor={Colors.primary}
                    onChangeText={onChangeText}
                    value = {value}
                    style={{
                        fontSize: 18,
                        width: "95%"
                    }}
                />
                <Image source={require('../assets/svg/loupe.png')} style={styles.img} />
            </View>
        </View>
    )
}
export default Header

const styles = StyleSheet.create({
    search: {
        height: 50,
        borderWidth: 1,
        padding: 10,
        width: "80%"
    },
    img: {
        width: 30,
        height: 30,
    },
    txt: {
        fontSize: 30,
        fontWeight: "bold"
    },
    imgProduct:{
        width: 150,
        height: 150,       
    },
    txtName:{
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10
    }

})