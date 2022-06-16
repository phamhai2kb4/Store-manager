import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native'

const RenderFeature = () => {
    const featuresData = [
        {
            id: 1,
            icon: require("../../assets/images/box.png"),
            description: "Tổng doanh thu",
            default: "0đ",
            colorText: "red"
        },
        {
            id: 2,
            icon: require("../../assets/images/box.png"),
            description: "Doanh thu hôm nay",
            default: "0đ"
        },
        {
            id: 3,
            icon: require("../../assets/images/box.png"),
            description: "Mặt hàng đã bán",
            default: 0
        },
        {
            id: 4,
            icon: require("../../assets/images/box.png"),
            description: "Đơn hàng đã nhận",
            default: 0
        },
    ]
    const [features, setFeatures] = React.useState(featuresData)

    const renderItem = ({ item }) => (
        <View
            style={{
                marginBottom: 12,
                alignItems: 'center',
            }}
            onPress={() => console.log(item.description)}
        >
            <View
                style={{
                    height: 160,
                    width: 180,
                    borderRadius: 15,
                    backgroundColor: "white",
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                }}
            >
                <Image
                    source={item.icon}
                    resizeMode="contain"
                    style={{
                        height: 30,
                        width: 30,
                        tintColor: item.color,
                        margin: 10
                    }}
                />
                <Text style={{ textAlign: 'center', flexWrap: 'wrap', fontSize: 16, marginBottom: 10, color: item.colorText }}>{item.default}</Text>
                <Text style={{ textAlign: 'center', flexWrap: 'wrap', fontSize: 12 }}>{item.description}</Text>
            </View>
        </View>
    )
    return (
        <FlatList
            data={features}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            style={{ marginTop: 15, padding: 10 }}
        />
    )
}
export default RenderFeature