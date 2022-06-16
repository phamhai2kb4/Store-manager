import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'

function _getStatus(status) {
    return status.trim() === "Hoàn thành" ? "#2ABB9C" :
        (status.trim() === "Đang vận chuyển" ? "orange" :
            (status.trim() === "Đã xác nhận" ? "blue" :
                (status.trim() === "Đơn hàng mới" ? "red" : "#2ABB9C")))
}

function TotalPrice(price) {
    return Number(price).toLocaleString('vi-VN');
}


const OrderItem = (props) => {
    const { _id, created_at, status, grandTotal } = props.item
    const {onPress} = props
    const date = new Date(created_at)
    const date_ = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    return (
        <TouchableOpacity style={styles.orderRow} onPress={onPress}>
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
                <Text style={{ color: _getStatus(status) }}>{status}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tổng tiền hàng:</Text>
                <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{TotalPrice(grandTotal)}đ</Text>
            </View>
        </TouchableOpacity>
    )
}
export default OrderItem

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    orderRow: {
        height: width / 3,
        backgroundColor: '#FFF',
        marginVertical: 10,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#DFDFDF',
        shadowOpacity: 0.2,
        padding: 10,
        borderRadius: 2,
        justifyContent: 'space-around'
    }
})