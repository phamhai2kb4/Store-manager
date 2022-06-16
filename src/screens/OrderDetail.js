import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import HeaderDetail from "../components/HeaderDetail";

import { getUserId } from "../service/signin"
import { updateOrder } from "../service/order"
import RadioButtonRN from 'radio-buttons-react-native';

function _getStatus(status) {
    return status.trim() === "Hoàn thành" ? "green" :
        (status.trim() === "Đang vận chuyển" ? "orange" :
            (status.trim() === "Đã xác nhận" ? "blue" :
                (status.trim() === "Đơn hàng mới" ? "red" : "yellow")))
}

const OrderDetail = (props) => {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const [user, setUser] = useState()
    const [checked, setChecked] = useState();
    const item = route?.params?.data ?? null
    const data = [
        {
            label: 'Đã xác nhận'
        },
        {
            label: 'Đang vận chuyển'
        },
        {
            label: 'Hoàn thành'
        },
    ];

    useEffect(async () => {
        const res_ = await getUserId(item.userId)
        setUser(res_.user)
    }, [])

    function TotalPrice(price) {
        return Number(price).toLocaleString('vi-VN');
    }

    const ClickOrder = () => {
        updateOrder(item._id, checked)
        if (route?.params?.goBack) {
            route?.params?.goBack()
        }
        goBack()
    }

    return (
        <View style={styles.container}>
            <HeaderDetail
                name='arrow-left'
                title={`ORD #${item._id}`}
                onPressLeft={() => {
                    goBack()
                }}
            />
            <View style={{
                padding: 10,

            }}>
                <View
                    style={{
                        flexDirection: "row",
                    }}>
                    <View style={{
                        marginEnd: 20
                    }}>
                        <Image source={require('../assets/svg/note.png')} style={styles.imgProduct} />
                    </View>

                    <View style={{
                        flex: 1,
                    }}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    width: "60%",
                                    fontWeight: "bold",
                                    fontSize: 20,
                                }}>#{item._id}</Text>

                            <View style={{ flex: 1 }} />

                            <View style={{
                                backgroundColor: _getStatus(item.status),
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 100,
                            }}>
                                <Text style={{


                                    color: "white"
                                }}>{item.status}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
            <ScrollView style={{ marginHorizontal: 10 }}>
                <View >
                    <View style={{ marginVertical: 20 }}>
                        <Text style={{ fontSize: 20 }}>Địa chỉ thanh toán</Text>
                    </View>

                    {user != null ? <View style={styles.view1}>
                        <Text style={{ marginBottom: 20, fontWeight: "500", fontSize: 24 }}>{user.name}</Text>
                        <Text style={{ marginBottom: 10 }}>Địa chỉ: {user.diachi}</Text>
                        <Text style={{ marginBottom: 10 }}>Email: {user.email}</Text>
                        <Text style={{ marginBottom: 10 }}>Số điện thoại: {user.phone}</Text>

                    </View> : null}

                    <View style={{ marginVertical: 20 }}>
                        <Text style={{ fontSize: 20 }}>Thông tin sản phẩm</Text>
                    </View>

                    {item.items.map(item => <View style={styles.view2} key={item._id}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}>
                            <Text style={{ marginBottom: 10, fontWeight: "500", fontSize: 18, color: "blue", width: "60%", paddingEnd: 5 }}>{item.name}  x{item.qty}</Text>
                            <Text style={{ marginBottom: 10 }}>{TotalPrice(item.price)}đ</Text>
                        </View>
                        <Text style={{ fontSize: 14 }}>color: </Text>
                    </View>)}
                    <View style={{ marginVertical: 20 }}>
                        <Text style={{ fontSize: 20 }}>Thông tin thanh toán</Text>
                    </View>

                    <View style={{
                        height: 180,
                        backgroundColor: "white",
                        justifyContent: "center",
                        borderRadius: 10,
                        justifyContent: "center",
                        paddingHorizontal: 30,
                        opacity: 0.7
                    }}>
                        <View style={{
                            marginBottom: 10,
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }}>
                            <Text>Phương thức thanh toán: </Text>
                            <Text>{item.paymentMethod}</Text>
                        </View>
                        <View style={{
                            marginBottom: 10,
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }}>
                            <Text>Tổng tiền hàng: </Text>
                            <Text>{TotalPrice(item.grandTotal)}đ</Text>
                        </View>
                        <View style={{
                            marginBottom: 10,
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }}>
                            <Text>Tổng phí vận chuyển: </Text>
                            <Text>{TotalPrice(item.fax)}đ</Text>
                        </View>
                        <View style={{
                            marginBottom: 10,
                            justifyContent: "space-between",
                            flexDirection: "row"
                        }}>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Tổng thanh toán: </Text>
                            <Text>{TotalPrice(item.grandTotal)}đ</Text>
                        </View>

                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Text style={{ fontSize: 20 }}>Thay đổi trạng thái đơn hàng</Text>
                        <RadioButtonRN
                            data={data}
                            selectedBtn={(e) => setChecked(e.label)}
                        />
                    </View>

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 20
                    }}>
                        <TouchableOpacity
                            onPress={() => { ClickOrder() }}
                            style={styles.btnLuu}>
                            <Text>Lưu đơn hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}
export default OrderDetail

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imgProduct: {
        width: 30,
        height: 30,
    },
    txtName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10
    },
    view1: {
        height: 180,
        backgroundColor: "white",
        justifyContent: "center",
        borderRadius: 10,
        justifyContent: "center",
        paddingHorizontal: 30
    },
    view2: {
        backgroundColor: "white",
        justifyContent: "center",
        borderRadius: 10,
        justifyContent: "center",
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginBottom: 5
    },
    btnLuu: {
        width: 120,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#4D96FF"
    }
})

