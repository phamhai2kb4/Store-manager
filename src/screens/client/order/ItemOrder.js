import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'

const ItemOrder = (props) => {
    const { _id, created_at, status, grandTotal } = props.item
    const date = new Date(created_at)
    const date_ = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    function TotalPrice(price) {
        return Number(price).toLocaleString('vi-VN');
    }
    
    return (
        <View style={styles.orderRow}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Mã đơn hàng:</Text>
                <Text style={{ color: '#2ABB9C' }}>#{_id}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Ngày đặt hàng:</Text>
                <Text style={{ color: '#C21C70' }}>{date_}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Trạng thái:</Text>
                <Text style={{ color: '#2ABB9C' }}>{status}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tổng tiền hàng:</Text>
                <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{TotalPrice(grandTotal)}đ</Text>
            </View>
        </View>
    )
}
export default ItemOrder
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper: { flex: 1 },
    header: { flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: 'black', fontSize: 20 },
    backIconStyle: { width: 30, height: 30 },
    body: { flex: 1, backgroundColor: '#F6F6F6' },
    orderRow: {
        height: width / 3,
        backgroundColor: '#FFF',
        margin: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#DFDFDF',
        shadowOpacity: 0.2,
        padding: 10,
        borderRadius: 2,
        justifyContent: 'space-around'
    }
})
