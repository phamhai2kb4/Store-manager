import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Animated,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { Easing } from "react-native-reanimated";
import {useDispatch, useSelector} from 'react-redux'
import { updateEmail } from "../redux/action/UpdateAction";

const Animation = ({navigation}) => {
    const topMotion = useRef(new Animated.Value(0)).current
    const spinValue = useRef(new Animated.Value(0)).current

    const [email, onChangeEmail] = useState()
    const info = useSelector((state) => state.personalInfo)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            // Animated.timing(
            //     topMotion,
            //     {
            //         toValue: 500,
            //         duration: 1000,
            //         useNativeDriver: false,
            //         //1. di chuyen tinh tien deu
            //             //easing: Easing.linear
            //         //2. di chuyen ban dau cham tang ve sau
            //             // easing: Easing.ease
            //             // easing: Easing.quad
            //             // easing: Easing.cubic
            //             // easing: Easing.poly(4)
            //             // easing: Easing.sin
            //             // easing: Easing.circle
            //         //3.lui lai 1 chut roi di chuyen
            //             // easing: Easing.back(0.8)
            //         //4. di chuyen voi van toc thay doi
            //             // easing: Easing.bezier(.0,.87,.91,.1)
            //         //5. nhay len
            //         // easing: Easing.bounce
            //     }
            // ).start()
            Animated.loop(
                Animated.sequence(
                    [Animated.timing(
                        spinValue, {
                        toValue:1,
                        duration: 200,
                        useNativeDriver: false
                    }),
                    Animated.timing(
                        spinValue, {
                        toValue: -1,
                        duration:400,
                        useNativeDriver: false
                    }),
                    Animated.timing(
                        spinValue, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false
                    }),
                ])
            ).start()
        }, 1000)
    }, [])
    const spin = spinValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['-45deg', '0deg', '45deg']
    })
    return (
        <View style={{
            flex: 1,
            borderWidth: 5,
            borderColor: "red",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <TouchableOpacity 
                style={{width: 100, height: 40, marginBottom: 20}}
                onPress={()=>{
                navigation.navigate('Login')
            }}>
                <Text>ship</Text>
            </TouchableOpacity>
            <Animated.View style={{
                transform: [{ rotate: spin }],
                // marginTop:topMotion,
                width: 150,
                height: 150,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Image style={{ width: 150, height: 150 }} resizeMode="stretch" source={require('../assets/svg/bell.png')} />
            </Animated.View>
            <View style={{
                width: "100%",
                justifyContent: "center",
                alignItems:"center"
            }}>
                <Text>email: {info.email}</Text>
                <Text>address: {info.address}</Text>
                <Text>id: {info.id}</Text>
                <Text>score: {info.score}</Text>

                <TextInput 
                    placeholder="nhap"
                    onChangeText={onChangeEmail}
                    value={email}
                    style={{width: "80%", height: 40, borderWidth: 1, marginTop: 20}}
                />
                <TouchableOpacity
                    onPress={()=>{
                        dispatch(updateEmail(email))}
                    }
                    style={{
                        width: "40%",
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20,
                        borderWidth: 1,
                        borderRadius: 10
                    }}>
                    <Text>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Animation