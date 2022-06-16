import React, { useState, useEffect } from 'react'
import {
    View,
    FlatList,
    ActivityIndicator
} from 'react-native'
import Header from '../components/Header'
import OrderItem from './order/OrderItem'
import { getOrder } from '../service/order'
import ShimmerItemProduct, { height } from './product/ShimmerItemProduct';
import ShimmerLoading from '../container/ShimmerLoading';

const OrderScreen = ({ navigation }) => {
    const { navigate, goBack } = navigation
    const [order, setOrder] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(true)
    const onRefresh = () => {
        setRefreshing(true);
        getData(() => { setRefreshing(false) });
    };

    async function getData() {
        const res = await getOrder()
        setOrder(res.orders)
        setLoaded(false)
        setRefreshing(false)
    }

    useEffect(async () => {
        getData()
    }, [])

    const handleLoad = () => {
        setLoaded(true)
        setRefreshing(false)
        getData()
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {loaded ? (<View style={{ minHeight: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>) : (
                <View style={{ flex: 1 }}>
                    <Header
                        title="Đơn hàng"
                        image={require('../assets/svg/menu.png')}
                    />
                    <FlatList
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        data={order}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => <OrderItem item={item} onPress={() => {
                            navigate('OrderDetail', { data: item, goBack:() => handleLoad() })
                        }} />
                        }
                    />
                </View>)}

        </View>
    )
}
export default OrderScreen
