import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Keyboard,
    Alert
} from 'react-native'
import HeaderDetail from '../components/HeaderDetail'
import { signup } from '../service/signup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from '../components/Icon';
import { isValidEmail, isValidPassword } from '../utils/Validation'

const Register = (props) => {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const [name, setFullName] = useState()
    const [email, setEmail] = useState("")
    const [passWord, setPassWord] = useState("")
    const [phone, setPhone] = useState()
    const [rePassWord, setRePassWord] = useState("")
    const [errorPassWord, setErrorPassWord] = useState()
    const [errorRePassWord, setReErrorPassWord] = useState()
    const [errorName, setErrorName] = useState()
    const [errorPhone, setErrorPhone] = useState()
    const [isShowPass, setIsShowPass] = useState()
    const [isShowPass_, setIsShowPass_] = useState()
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [errorEmail, setErrorEmail] = useState('')

    const isVaidationOK = () => email.length > 0 && passWord.length > 0
        && isValidEmail(email) == true
        && isValidPassword(passWord) == true
        && isValidPassword(rePassWord) == true
        && passWord == rePassWord

    const xuly = () => {
        if (name != null  ||  phone != null) {
            Alert.alert(
                'Thông báo!',
                'Nhấn Ok để đăng ký tài khoản?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => { },
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            signup(name, email, passWord, phone)
                            if(route?.params?.goBack){
                                route?.params?.goBack()
                            }
                            navigate('Login', {email: email, passWord: passWord})
                        },
                    },
                ],
                { cancelable: true },
            );
            
        }
        else {
            setErrorName("Vui lòng nhập họ và tên!")
            setErrorPhone("Vui lòng nhập số điện thoại!")
        }
    }

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardStatus(true);
        })
        Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardStatus(false);
        })
    },[])

    return (
        <KeyboardAwareScrollView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {keyboardStatus == false && <View style={{ alignItems: "center" }}>
                <HeaderDetail
                    name="arrow-left"
                    title="Đăng ký"
                    onPressLeft={() => {
                        goBack()
                    }}
                />
                {/* <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                <Text style={styles.textWelcome}>Đăng ký</Text> */}
                <Image style={styles.vector} source={require('../assets/images/vector.png')} />
            </View>}

            <View style={styles.content}>
                <View style={styles.viewInput}>
                <Text style={{fontSize: 18}}>Họ và tên:</Text>
                    <View style={[{
                        flexDirection: "row",
                        alignItems: "center"
                    }, styles.input]}>
                        <Icon name="account" size={20} style={styles.user} color="#8e9991" />
                        <TextInput
                            style={{ flex: 1, paddingHorizontal: 10 }}
                            placeholder="Họ và tên"
                            keyboardType="default"
                            onChangeText={(text) => {
                                setFullName(text)
                            }}
                            value={name}
                        />
                    </View>
                    <Text style={{color: 'red',fontSize: 12}}>{errorName}</Text>
                    <Text style={{fontSize: 18}}>Email:</Text>
                    <View style={[{
                        flexDirection: "row",
                        alignItems: "center"
                    }, styles.input]}>
                        <Icon name="email" size={20} style={styles.user} color="#8e9991" />
                        <TextInput
                            style={{ flex: 1, paddingHorizontal: 10 }}
                            placeholder="Email"
                            keyboardType="email-address"
                            onChangeText={(text) => {
                                setErrorEmail(isValidEmail(text) == true ? '' : "Email không đúng định dạng!")
                                setEmail(text)
                            }}
                            value={email}
                        />
                    </View>
                    <Text style={{color: 'red',fontSize: 12}}>{errorEmail}</Text>
                    <Text style={{fontSize: 18}}>Số điện thoại:</Text>
                    <View style={[{
                        flexDirection: "row",
                        alignItems: "center"
                    }, styles.input]}>
                        <Icon name="phone" size={20} style={styles.user} color="#8e9991" />
                        <TextInput
                            style={{ flex: 1, paddingHorizontal: 10 }}
                            placeholder="Số điện thoại"
                            keyboardType="phone-pad"
                            onChangeText={(text) => {setPhone(text)}}
                            value={phone}
                        />
                    </View>
                    <Text style={{
                        color: 'red',
                        fontSize: 12
                    }}>{errorPhone}</Text>
<Text style={{fontSize: 18}}>Mật khẩu:</Text>
                    <View style={[{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }, styles.input]}>
                        <Icon name="lock" size={20} style={styles.user} color="#8e9991" />
                        <TextInput
                            style={{ flex: 1, paddingHorizontal: 10 }}
                            placeholder="Mật khẩu"
                            onChangeText={(text) => {setErrorPassWord(isValidPassword(text) == true ?'' : 'Mật khẩu phải có ít nhất 3 ký tự')
                                setPassWord(text)
                            }}
                            value={passWord}
                            secureTextEntry={!isShowPass ? true : false}
                        />
                        <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => {
                            setIsShowPass(!isShowPass)
                        }}>
                            {isShowPass ? <Icon name="eye-off-outline" size={25} color="#8e9991" /> : <Icon name="eye-outline" size={25} color="#8e9991" />}
                        </TouchableOpacity>
                    </View>
                    <Text style={{color: 'red',fontSize: 12}}>{errorPassWord}</Text>
                    <Text style={{fontSize: 18}}>Nhập lại mật khẩu:</Text>
                    <View style={[{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }, styles.input]}>
                        <Icon name="lock" size={20} style={styles.user} color="#8e9991" />
                        <TextInput
                            style={{ flex: 1, paddingHorizontal: 10 }}
                            placeholder="Nhập lại mật khẩu"
                            onChangeText={(text) => {
                                setReErrorPassWord(isValidPassword(text) == true ? '' : 'Mật khẩu phải có ít nhất 3 ký tự')
                                setRePassWord(text)
                            }}
                            value={rePassWord}
                            secureTextEntry={!isShowPass_ ? true : false}
                        />
                        <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => {
                            setIsShowPass_(!isShowPass_)
                        }}>
                            {isShowPass_ ? <Icon name="eye-off-outline" size={25} color="#8e9991" /> : <Icon name="eye-outline" size={25} color="#8e9991" />}
                        </TouchableOpacity>
                    </View>
                    <Text style={{color : 'red',fontSize : 12}}>{errorRePassWord}</Text>
                    
                </View>
                
                <TouchableOpacity
                    disabled={isVaidationOK() == false}
                    onPress={() => {xuly()}}
                    style={{
                        backgroundColor: isVaidationOK() == true ? "#4D96FF" : "#c4ccc6",
                        borderRadius: 10,
                        width: '50%',
                        height: 40,
                        marginVertical: 10,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textWelcome: {
        marginVertical: 19,
        fontSize: 30,
        fontWeight: "bold"
    },
    vector: {
        marginBottom: 20,
    },
    content: {
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    user: {
        paddingStart: 10
    },
    btnDk: {
        width: "50%",
        height: 40,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10
    },
    error: {
        marginTop: 10,
        color: "red"
    },
    input: {
        height: 50,
        marginVertical: 12,
        width: "100%",
        borderWidth: 1,
        borderColor: '#97999c',
        borderRadius: 10
    },
})