import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator
} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../product/ProductItem'
import { getProduct } from '../../../service/product'
import { getCategory } from '../../../service/category'
import ItemCat from './ItemCat'
import { GetAllProduct } from "../../../redux/action/CartAction";
import endpoints from "../../../service/endpoints"
import { Base_URL } from '../../../configs/Configs'
const Home = (props) => {
    const { navigate, goBack } = props.navigation
    const info = useSelector((state) => state.personalInfo)
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [loaded, setLoaded] = useState(true)
    const dispatch = useDispatch()

    const onRefresh = () => {
        setRefreshing(true);
        getData(() => setRefreshing(false));
    };

    const getData = async () => {
        const res = await getProduct()
        setProducts(res.products)
        setLoaded(false)
        dispatch(GetAllProduct(res.products))
        setRefreshing(false)
    }

    useEffect(async () => {
        const res = await getCategory()
        setCategory(res.categories)
        getData()
    }, [])

    function view () {
        <ItemCat />
    }

    const [categories, setCategory] = useState()

    const searchProduct = () => products.filter(e => e.tenSp.toLowerCase().includes(search.toLowerCase()))

    return (
        <View style={styles.container}>
            {loaded ? (<View style={{ minHeight: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>) : (
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <Image
                            source={require('../../../assets/images/store.png')}
                            style={{
                                width: 50,
                                height: 50,
                                marginTop: 30
                            }}
                        />
                        {info.user != null ? <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            marginTop: 10,
                            width: "100%"
                        }}>
                            <View style={{
                                width: "50%"
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    color: "white",
                                    fontWeight: "700"
                                }}>{info.user.name}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: "white",
                                }}>{info.user.email}</Text>

                            </View>
                            <TouchableOpacity
                                style={{
                                    width: "50%",
                                    alignItems: "flex-end"
                                }}>
                                <Image source={require('../../../assets/svg/bell.png')}

                                    style={{ height: 35, width: 35 }}

                                />
                            </TouchableOpacity>
                        </View> : null}
                    </View>
                    <View
                        style={{
                            left: 0,
                            right: 0,
                            height: 90,
                            marginTop: -45
                        }}
                        colors={["rgba(0,164,109,0.4)", "transparent"]}
                    >
                        <View style={styles.search}>
                            <TextInput
                                onChangeText={(text) => {
                                    setSearch(text)
                                }}
                                placeholder="Tìm kiếm "
                                placeholderTextColor="#4D96FF"
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    width: "95%"
                                }}
                            />
                            <Icon name="search" size={20} color="#4D96FF"
                                style={{
                                    padding: 5
                                }}
                            />

                        </View>
                    </View>
                    <FlatList
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        data={searchProduct()}
                        numColumns={2}
                        keyExtractor={item => item._id}
                        ListHeaderComponent={(
                            <View style={{ height: 120 }}>
                                <View style={{ borderTopWidth: 1, borderColor: 'black', opacity: 0.1 }} />
                                <FlatList data={categories}
                                    horizontal={true}
                                    keyExtractor={item => item._id}
                                    renderItem={({ item }) => {
                                        return <TouchableOpacity
                                            onPress={()=>navigate("Categories", item)}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                margin: 10
                                            }}>
                                            <Image
                                                style={{
                                                    resizeMode: 'stretch',
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 40,
                                                    margin: 5,
                                                }}
                                                source={
                                                    {
                                                        uri: `${Base_URL + endpoints.v1.upload() + item.image}`
                                                    }
                                                } />
                                            <Text style={{
                                                fontSize: 14
                                            }}>{item.name}</Text>
                                        </TouchableOpacity>
                                    }}
                                />
                                <View style={{ borderBottomWidth: 1, borderColor: 'black', opacity: 0.1, marginBottom: 10 }} />
                            </View>
                        )}
                        renderItem={({ item, index }) => <ProductItem item={item} index={index}
                            onPressDetail={() => {
                                navigate('ProductDetail', item)
                            }}
                            onPress={() => {
                                let cloneProducts = products.map(eachproduct => {
                                    if (item.tenSp == eachproduct.tenSp) {
                                        return {
                                            ...eachproduct,
                                            //isSaved: true
                                            isSaved: eachproduct.isSaved == false || eachproduct.isSaved == undefined ? true : false
                                        }
                                    }
                                    return eachproduct
                                })
                                setProducts(cloneProducts)
                            }} />}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "red" }}>Not Found</Text>
                                </View>
                            )
                        }}
                    />
                </View>)}
        </View>
    )
}
export default Home
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: "#4D96FF",
        height: "28%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20
    },
    search: {
        backgroundColor: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 15,
        marginTop: 25,
        flexDirection: "row",
        alignItems: "center"
    }
})