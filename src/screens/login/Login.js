import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    ActivityIndicator
} from 'react-native'
import { onLoggedIn } from "../../service/signin";
import { useDispatch, useSelector } from 'react-redux'
import { SelectUser } from "../../redux/action/UpdateAction";
import saveToken from "../../service/saveToken";
import Icon from '../../components/Icon';

const Login = (props) => {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const [email, setEmail] = useState()
    const [passWord, setPassWord] = useState()
    const [loginFailed, setLoginFailed] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const [isShowPass, setIsShowPass] = useState()
    const [loaded, setLoaded] = useState(true)
    const dispatch = useDispatch()

    const email__ = route?.params?.email ?? null
    const passWord__ = route?.params?.passWord ?? null
    
    const handleLoad = () => {
        if (email__ != null && passWord__ != null) {
            setLoaded(true),
            () => {getData()}
        }else{
            setLoaded(false)
        }
    };

    const getData = async () => {
        const res = await onLoggedIn()
        setEmail(email__),
        setPassWord(passWord__),
        setLoaded(false)
    }

    useEffect(() => {
        getData()
    }, [])

    const Login = (email_, passWord_) => {
        onLoggedIn(email_, passWord_)
            .then(res => {
                if (email != null || passWord != null) {
                    if (res) {
                        saveToken(res.token);
                        res.user.forEach(item => {
                            dispatch(SelectUser(item))
                            if (item.userType === "admin") {
                                navigate('UiTab')
                            }
                            else if (item.userType === "user") {
                                navigate('TabClient')
                            }
                        });
                    } else {
                        setLoginFailed('Tài khoản hoặc mật khẩu không đúng')
                    }
                } else {
                    setLoginFailed('Vui lòng nhập tài khoản hoặc mật khẩu!')
                }

            })
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            {loaded ? (<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator />
            </View>) : (
                <View style={{ flex: 1 }}>
                    <View style={styles.content}>
                        <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
                        <Text style={styles.textWelcome}>Welcome</Text>
                        <Image style={styles.vector} source={require('../../assets/images/vector.png')} />
                        <View style={{
                            width: "100%",
                            alignItems: 'center'
                        }}>
                            <View style={[{
                                flexDirection: "row",
                                alignItems: "center"
                            }, styles.input]}>
                                <Icon name="account" size={20} style={styles.user} color="#8e9991" />
                                <TextInput
                                    style={{ flex: 1, paddingHorizontal: 10 }}
                                    placeholder="Tài khoản"
                                    keyboardType="email-address"
                                    onChangeText={(text) => {
                                        setEmail(text)
                                    }}
                                    value={email}

                                />
                            </View>
                            <View style={[{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }, styles.input]}>
                                <Icon name="lock" size={20} style={styles.user} color="#8e9991" />
                                <TextInput
                                    style={{ flex: 1, paddingHorizontal: 10 }}
                                    placeholder="Mật khẩu"
                                    onChangeText={(text) => {
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
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.error}>{loginFailed}</Text>
                                <View style={{ flex: 1 }} />
                                <TouchableOpacity>
                                    <Text style={styles.viewForgot}>Quên mật khẩu!</Text>
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity style={styles.btnLogin}
                                onPress={() => { Login(email, passWord) }}>
                                <Text>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                    <View style={styles.textRegister}>
                        <View style={{ flex: 1 }} />
                        <Text>Bạn chưa có tài khoản ? </Text>
                        <TouchableOpacity
                            onPress={() => [
                                navigate('Register', { goBack: () => handleLoad() })
                            ]}
                        >
                            <Text>Đăng kí</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                    </View>
                </View>
            )}

        </KeyboardAvoidingView>
    )
}
export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 26,
        alignItems: 'center',
    },
    logo: {
        marginTop: 94,
    },
    textWelcome: {
        marginVertical: 19,
        fontSize: 30,
        fontWeight: "bold"
    },
    vector: {
        marginBottom: 50,
    },
    input: {
        height: 50,
        marginVertical: 12,
        width: "100%",
        borderWidth: 1,
        borderColor: '#97999c',
        borderRadius: 10
    },
    user: {
        paddingStart: 10
    },
    btnLogin: {
        borderWidth: 1,
        width: "30%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        margin: 12,
        borderRadius: 10,
        borderColor: '#97999c'
    },
    error: {
        alignItems: 'flex-start',
        color: "red"
    },
    viewForgot: {
        alignItems: 'flex-end',
        marginBottom: 30,
    },
    textRegister: {
        marginTop: 90,
        marginVertical: 20,
        textAlign: 'center',
        flexDirection: "row"
    },
})