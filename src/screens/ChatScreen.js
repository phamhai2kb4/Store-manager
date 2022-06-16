import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet
} from 'react-native'
import Header from '../components/Header'
import { getInfo } from '../service/signin'

const ChatScreen = ({ navigation }) => {
    const { navigate, goBack } = navigation
    const [userInfo, setUserInfo] = useState()
    const [listFriend, setListFriend] = useState()

    useEffect(async () => {
        //const user = await getUser()
        const res = await getInfo()
        //res.push(user)
        setListFriend(res)

    }, [])
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                padding: 10
            }}>
                <Header
                    title='All Chat'
                    image={require("../assets/svg/email.png")}
                />
                <View style={{
                    marginVertical: 20
                }}>
                    <Text style={{
                        fontSize: 20
                    }}>Reccent Chat</Text>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={listFriend}
                        keyExtractor = {(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems:"center"
                                }}>
                                    <Image source={{ uri: item.avatar }} style={styles.image} />
                                    <Text numberOfLines={1}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />

                </View>
            </View>

            <View style={{
                flex: 1,
                backgroundColor: "white",
                borderTopStartRadius: 50,
                borderTopEndRadius: 50,
            }}>
                <View style={{ height: 30 }} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={listFriend}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    // navigate("Chat", item)
                                }}
                                style={{ padding: 10, flexDirection: "row" }}>
                                <Image style={{
                                    height: 70,
                                    width: 70,
                                    borderRadius: 100,

                                }} source={{ uri: item.avatar }} />
                                <View style={{
                                    flex: 1,
                                    borderBottomWidth: 1,
                                    marginHorizontal: 10,
                                    justifyContent: "center"
                                }}>
                                    <Text style={{                                             
                                        fontSize: 20,
                                        fontWeight: "700",
                                    }}>{item.name}</Text>
                                    <Text numberOfLines={1}>{item.content}</Text>
                                </View>

                            </TouchableOpacity>
                        )
                    }}
                />

            </View>

        </View>
    )
}
export default ChatScreen
const styles = StyleSheet.create({
    image: {
        height: 70,
        width: 70,
        borderRadius: 100,
        marginVertical: 10,
        marginHorizontal: 10
    },
})