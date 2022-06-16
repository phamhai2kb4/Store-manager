import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    FlatList,
    Text,
    ActivityIndicator
} from 'react-native';
import Header from '../../../components/HeaderDetail'
import { getOrder } from '../../../service/order'
import { useDispatch, useSelector } from 'react-redux'
import ItemOrder from "./ItemOrder";
const Order = (props) => {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const [ListOrder, setListOrder] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [loaded, setLoaded] = useState(true)
    const info = useSelector((state) => state.personalInfo)

    const onRefresh = () => {
        setRefreshing(true)
        getData({}, () => setRefreshing(false))
    }

    const getData = async () =>{
        const res = await getOrder()
        setListOrder(res.orders);
        setLoaded(false)
        setRefreshing(false)
    }

    useEffect(async () => {
        getData()
    }, [])

    var ListOrder_ = []
    ListOrder.forEach(function (item) {
        if (info.user._id === item.userId) {
            var _item = item
            ListOrder_.push(_item)
        }
    });

    return (
        <View style={styles.wrapper}>
            {loaded ? (<View style={{ minHeight: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>) : (
                <View style={{ flex: 1 }}>
                    <Header title='Lịch sử đơn hàng' />
                    <View style={styles.body}>
                        <FlatList
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            data={ListOrder_}
                            keyExtractor={item => item._id}
                            renderItem={({ item }) => <ItemOrder item={item} />}
                            ListEmptyComponent={() => {
                                return (
                                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 250 }}>
                                        <Text style={{
                                            color: "red"
                                        }}>Chưa có đơn hàng!</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>)}
        </View>
    )
}
export default Order

const styles = StyleSheet.create({
    wrapper: { flex: 1 },
    body: { flex: 1, backgroundColor: '#F6F6F6' },
})

