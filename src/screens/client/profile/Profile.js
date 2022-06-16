import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Switch
} from 'react-native'
import Header from '../../../components/HeaderDetail'
import { useDispatch, useSelector } from 'react-redux'
import { StackActions } from "@react-navigation/native"
import SettingItem from '../../SettingItem'

const Profile = (props) =>{
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const [userInfo, setUserInfo] = useState()
    const info = useSelector((state) => state.personalInfo)
    const [dark, setDark] = useState(false)
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            if (value !== null) {
                return value
            }

        } catch (e) {
            // error reading value
        }
    }

    useEffect(async () => {
        try {
            const user = await getData()
            setUserInfo(user)
        } catch (error) {
            return false
        }
        return true

    }, [])



    return (
        <View style={{ flex: 1 }}>
            
            <ScrollView>
                <View style={{
                    backgroundColor: "white",
                    height: 150,
                    marginHorizontal: 20,
                    borderRadius: 10,
                    justifyContent: "center",
                    padding: 20,
                    marginTop : 20
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <Image source={require("../../../assets/svg/user.png")}
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    resizeMode: "contain"
                                }}
                            />
                            <View style={{
                                marginStart: 20
                            }}>
                                <Text style={{ fontSize: 20, fontWeight: "500" }}>{info.user.name}</Text>
                                <Text>View Profile</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.dispatch(StackActions.popToTop()) }}>
                            <Image source={require("../../../assets/images/sign-out.png")}
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{
                    backgroundColor: "white",
                    margin: 20,
                    borderRadius: 10,
                    
                }}>
                    <SettingItem title='Tin nhắn' icon='envelope' icon1='chevron-right' />
                    {/* <SettingItem title='All Reviews' icon='discourse' icon1='chevron-right' />
                    <SettingItem title='Báo cáo' icon='bahai' icon1='chevron-right' /> */}

                    <View style={{
                        marginVertical: 20,
                        marginStart: 10
                    }}>
                        <Text style={{ fontSize: 24, fontWeight: "500", opacity: 0.5 }}>Settings</Text>
                    </View>
                    <SettingItem title='Settings Store' icon='wrench' icon1='chevron-right' />
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <SettingItem title='Chế độ tối' icon='moon' />
                        <View style={{
                            justifyContent: 'center',
                        }}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={dark ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => {
                                    setDark(!dark)
                                }}
                                value={dark}
                            />
                        </View>
                    </View>
                    <SettingItem title='Ngôn ngữ' icon='globe' title1="Tiếng Việt" icon1='chevron-right' />
                    <SettingItem title='Đánh giá ứng dụng' icon='star' icon1='chevron-right' />

                </View>
            </ScrollView>

        </View>
    )
}
export default Profile