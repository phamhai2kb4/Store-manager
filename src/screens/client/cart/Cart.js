import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native'
import endpoints from "../../../service/endpoints"
import { Base_URL } from '../../../configs/Configs'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../components/HeaderDetail'
import { getCart, deleteCart } from '../../../service/cart'

const Cart = (props) => {
    const info = useSelector((state) => state.personalInfo)
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const [product, setProduct] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const [quantity, setQuantity] = useState()
    const [cartId, setCartId] = useState()
    const [loaded, setLoaded] = useState(true)
    const [TotalCart, setTotalCart] = useState()

    function TotalPrice(price) {
        return Number(price).toLocaleString('vi-VN');
    }
    const checkOrder = () => {
        navigate("CheckOrder", [product, cartId, { goBack: () => handleLoad()}])
    }

    function DeleteItem(item) {
        const _product = product
        const _newList = _product.filter((_item) => {
            if (_item._id != item._id) {
                return _item
            }
        })
        setProduct(_newList)
    }

    function DecreaseQuantity(item) {
        if (item.qty > 1) {
            setQuantity(item.qty--)
        }

    }
    function IncreaseQuantity(item) {
        setQuantity(item.qty++)
    }

    const onRefresh = () => {
        setRefreshing(true)
        getData({}, () => setRefreshing(false))
    }
    
    async function getData() {
        const res = await getCart()
        let TotalCart = 0
        let arr = []
        if (res.carts != null) {
            res.carts.forEach(function (item) {
                setCartId(item._id)
                if (info.user._id === item.userId) {
                    const product = item.items
                    Object.keys(product).forEach(function (item) {
                        var item_ = product[item]
                        TotalCart += product[item].qty * product[item].price;
                        arr.push(item_)
                    })
                }
            })
        }
        setTotalCart(TotalCart)
        setProduct(arr)
        setLoaded(false)
        setRefreshing(false)
    }

    useEffect(async () => {
        getData()
    }, [])

    const handleLoad = () => {
        setRefreshing(true)
        getData()
    }

    return (
        <View style={styles.wrapper}>
            {loaded ? (<View style={{ minHeight: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>) : (
                <View style={{ flex: 1 }}>
                    <Header title='Giỏ hàng' icon="trash" onPressRight={() => {
                        Alert.alert(
                            'Thông báo',
                            'Bạn muộn xóa hết sản phẩm trong giỏ hàng ?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => { },
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        deleteCart(cartId)
                                        handleLoad()
                                    },
                                },
                            ],
                            { cancelable: true },
                        );
                    }} />
                    <View style={styles.body}>
                        <FlatList
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            data={product}
                            keyExtractor={item => item._id}
                            renderItem={({ item }) => (
                                <View style={styles.product} key={item.id}>
                                    <Image
                                        source={{ uri: `${Base_URL + endpoints.v1.upload() + item.image}` }}
                                        style={styles.productImage}
                                    />
                                    <View style={styles.mainRight}>
                                        <View
                                            style={{
                                                justifyContent: 'space-between',
                                                flexDirection: 'row',
                                            }}>
                                            <Text style={styles.txtName}>{item.name}</Text>
                                            <TouchableOpacity
                                                style={{ justifyContent: "center", alignItems: "center", width: 30, height: 30 }}
                                                onPress={() => { DeleteItem(item) }}>
                                                <Text style={{ fontFamily: 'Avenir', color: '#969696', }}>
                                                    X
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text style={styles.txtPrice}>{TotalPrice(item.price)}đ</Text>
                                        </View>
                                        <View style={styles.productController}>
                                            <View style={styles.numberOfProduct}>
                                                <TouchableOpacity
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                    onPress={() => IncreaseQuantity(item)}>
                                                    <Text>+</Text>
                                                </TouchableOpacity>
                                                <Text>{item.qty}</Text>
                                                <TouchableOpacity
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                    onPress={() => DecreaseQuantity(item)}>
                                                    <Text>-</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            ListEmptyComponent={() => {
                                return (
                                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 250 }}>
                                        <Text style={{
                                            color: "red"
                                        }}>Chưa thêm giỏ hàng!</Text>
                                    </View>
                                )
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => { checkOrder() }}
                            style={styles.checkoutButton}>
                            <View style={{ flex: 1 }} />
                            <View style={{
                                flex: 1,
                                alignItems: "center"
                            }} >
                                <Text style={styles.checkoutTitle}>Checkout</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                alignItems: "center"
                            }} >
                                {/* <Text style={styles.checkoutTitle}>{Number(TotalCart).toLocaleString('vi-VN')}đ</Text> */}
                            </View >
                        </TouchableOpacity>
                    </View>
                </View>)}
        </View>
    )
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        padding: 20,
    },
    headerTitle: { fontFamily: 'Avenir', color: 'black', fontSize: 20 },
    body: { flex: 1, backgroundColor: '#F6F6F6' },
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
    main: {
        width,
        backgroundColor: '#DFDFDF',
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir',
    },
    product: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'contain',
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between',
    },
    productController: {
        flexDirection: 'row',
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center"
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir',
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir',
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
})

export default Cart