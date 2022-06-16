import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native'
import { Colors } from '../components/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header'
import { getProduct, deleteProduct } from '../service/product'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Base_URL } from '../configs/Configs'
import endpoints from "../service/endpoints"
import ShimmerItemProduct, { height } from './product/ShimmerItemProduct';
import ShimmerLoading from '../container/ShimmerLoading';

const widthOpen = 68;
const ProductScreen = (props) => {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const [product, setProduct] = useState()
    const [page, setPage] = useState(1)
    const [refreshing, setRefreshing] = useState(false)
    const [loaded, setLoaded] = useState(true)

    const onRefresh = () => {
        setRefreshing(true);
        getData(() => setRefreshing(false));
    };
    
    async function getData() {
        const res = await getProduct()
        setProduct(res.products)
        setLoaded(false)
        setRefreshing(false)
    }
    useEffect(async () => {
        getData()
    }, [])

    const clickDelete = (id) => {
        Alert.alert(
            'Thông báo',
            'Bạn muốn xóa 1 sản phẩm?',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        const _product = product
                        const _newList = _product.filter((_item) => {
                            if (_item._id != id) {
                                return _item
                            }
                        })
                        setProduct(_newList)
                        deleteProduct(id)
                    },
                },
            ],
            { cancelable: true },
        );
    }
    const handleLoad = () => {
        setLoaded(true),
        getData();
    };
    function TotalPrice(price) {
        return Number(price).toLocaleString('vi-VN');
    }

    const [searchText, setSearchText] = useState('')

    const searchProduct = () => product.filter(i => i.tenSp.toLowerCase().includes(searchText.toLowerCase()))

    return (
        <View style={{
            flex: 1, padding: 10,
        }}>
            {loaded ? (<View style={{ minHeight: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>) : (
                <View style={{flex: 1}}>
                    <Header
                        title="Sản phẩm"
                        image={require('../assets/svg/menu.png')}
                        onChangeText={(text) => setSearchText(text)}
                        value={searchText}
                    />
                    {/* {loading ? (
                        <ShimmerLoading
                            style={styles.item}
                            Component={ShimmerItemProduct}
                            height={height}
                        />
                    ) : ( */}
                        <SwipeListView
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            showsVerticalScrollIndicator={false}
                            data={product}
                            keyExtractor={item => item._id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => { navigate('FormProductScreen', { data: item, goBackPrd: () => handleLoad() }) }}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: 10,
                                        backgroundColor: "white",
                                        paddingHorizontal: 5,
                                        paddingVertical: 10,
                                        borderRadius: 10
                                    }}>
                                    {item.productImage != "" ? <Image source={{ uri: `${Base_URL + endpoints.v1.upload() + item.productImage}` }} style={styles.imgProduct} />
                                        : <Image source={require('../assets/images/default_image.png')} style={styles.imgProduct} />
                                    }
                                    <View style={{
                                        borderBottomWidth: 1,
                                        flex: 1,
                                        height: 100,
                                        marginStart: 20,
                                        justifyContent: "center"
                                    }}>
                                        <Text style={styles.txtName}>{`Mã hàng: ${item.maSp}`}</Text>
                                        <Text style={styles.txtName}>{`Tên sp: ${item.tenSp}`}</Text>
                                        <View style={styles.viewPrice}>
                                            <Text style={styles.txtPrice}>{`Giá sp: ${TotalPrice(item.giaSp)}đ`}</Text>
                                            <View style={{ flex: 1 }} />

                                        </View>
                                        <Text style={styles.txtPrice}>{`Kho: ${item.tonKho}`}</Text>

                                    </View>

                                </TouchableOpacity>
                            )}
                            //leftOpenValue={widthOpen}
                            rightOpenValue={-widthOpen}
                            renderHiddenItem={({ item }) => {
                                return (
                                    <View style={styles.viewHiddenItem}>
                                        <TouchableOpacity
                                            style={[
                                                styles.touchDelete,
                                                ,
                                            ]}
                                            onPress={() => clickDelete(item._id)}>
                                            <Icon name="trash" color='red' size={25} />
                                        </TouchableOpacity>
                                    </View>
                                );
                            }}
                            ListEmptyComponent={() => {
                                return (
                                    <View style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 10
                                    }}>
                                        <Text style={{ color: "red" }}>Chưa có sản phẩm!</Text>
                                    </View>
                            )
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigate('FormProductScreen', { goBack: () => handleLoad()})}
                        style={styles.btnplus}>
                        <Icon name='plus' size={20} color="white" />
                    </TouchableOpacity>
                </View>)}
        </View>
    )
}
export default ProductScreen
const styles = StyleSheet.create({
    imgProduct: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: "contain"
    },
    txtName: {
        fontSize: 14,
        marginBottom: 10,

    },
    item: {
        paddingHorizontal: 25,
    },
    txtPrice: {
        paddingBottom: 10,
        marginRight: 5
    },
    viewPrice: {
        flexDirection: "row",
    },
    viewHiddenItem: {
        alignItems: 'flex-end',
    },
    touchDelete: {
        marginTop: 10,
        width: 68,
        height: '100%',
        justifyContent: 'center',
        alignItems: "center",
    },
    btnplus: {
        backgroundColor: Colors.primary,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 25,
        right: 25
    }

})