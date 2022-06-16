import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../../service/order'
import { deleteCart } from '../../../service/cart'

const CheckOrder = (props) => {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const [Cart, cartId, goBack_] = route?.params ?? null
    const info = useSelector((state) => state.personalInfo)
    let product = [];
    let TotalCart = 0;
    let fax = 0
    Object.keys(Cart).forEach(function (item) {
        TotalCart += Cart[item].qty * Cart[item].price;
        product.push(Cart[item]);
    })
    function TotalPrice(price) {
        return Number(price).toLocaleString('vi-VN');
    }

    function click(product) {
        createOrder(product, info.user._id)
        deleteCart(cartId)
        if (goBack_.goBack) {
            goBack_.goBack()
        }
        navigate("Order")
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Icon
                        name="arrow-left"
                        size={25}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold"
                }}>Thông tin đơn hàng</Text>
                <View />
            </View>

            <ScrollView style={{ marginHorizontal: 10 }}>
                <View style={{ marginVertical: 20 }}>
                    <Text style={{ fontSize: 20 }}>Địa chỉ thanh toán</Text>
                </View>

                {info.user != null ? <View style={styles.view1}>
                    <Text style={{ marginBottom: 20, fontWeight: "500", fontSize: 24 }}>{info.user.name}</Text>
                    <Text style={{ marginBottom: 10 }}>Địa chỉ: {info.user.tenkh}</Text>
                    <Text style={{ marginBottom: 10 }}>Email: {info.user.email}</Text>
                    <Text style={{ marginBottom: 10 }}>Số điện thoại: {info.user.phone}</Text>

                </View> : null}

                <View style={{ marginVertical: 20 }}>
                    <Text style={{ fontSize: 20 }}>Thông tin sản phẩm</Text>
                </View>
                {product.map((item) => <View style={styles.view2} key={item._id}>
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
                        <Text>COD</Text>
                    </View>
                    <View style={{
                        marginBottom: 10,
                        justifyContent: "space-between",
                        flexDirection: "row"
                    }}>
                        <Text>Tổng tiền hàng: </Text>
                        <Text>{Number(TotalCart).toLocaleString('vi-VN')}đ</Text>
                    </View>
                    <View style={{
                        marginBottom: 10,
                        justifyContent: "space-between",
                        flexDirection: "row"
                    }}>
                        <Text>Tổng phí vận chuyển: </Text>
                        <Text>{TotalPrice(fax)}đ</Text>
                    </View>
                    <View style={{
                        marginBottom: 10,
                        justifyContent: "space-between",
                        flexDirection: "row"
                    }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Tổng thanh toán: </Text>
                        <Text>{`${Number(fax + TotalCart).toLocaleString('vi-VN')}`}đ</Text>
                    </View>

                </View>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 20
                }}>
                </View>

            </ScrollView>
            <TouchableOpacity
                onPress={() => { click(product) }}
                style={styles.checkoutButton}>
                <View style={{ flex: 1 }} />
                <View style={{
                    flex: 1,
                    alignItems: "center"
                }} >
                    <Text style={styles.checkoutTitle}>Đặt hàng</Text>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: "center"
                }} >
                    <Text style={styles.checkoutTitle}></Text>
                </View >
            </TouchableOpacity>

        </View>
    );
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        padding: 20,
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: "#4D96FF",
        flexDirection: "row",
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
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
    txtName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10
    },
})

export default CheckOrder