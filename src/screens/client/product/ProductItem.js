import React from "react"
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native"
import { Icons, Colors, Fontsizes } from "../../../constants/index"
import Icon from 'react-native-vector-icons/FontAwesome'
import Fivestars from "../home/Fivestars"
import endpoints from "../../../service/endpoints"
import { Base_URL } from '../../../configs/Configs'

function ProductItem(props) {
    const { item, index, onPress, onPressDetail } = props

    function TotalPrice(price) {
        return Number(price).toLocaleString('vi-VN');
    }

    return <TouchableOpacity
        onPress={onPressDetail}
        style={{
            flex: 0.5,
            //backgroundColor: index % 2 == 0 ? 'green' : 'red',
            //height: 200,
            marginLeft: index % 2 == 0 ? 10 : 0,
            marginTop: 5,
            marginEnd: 10,
            marginBottom: 5,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#8ba8d6",
            backgroundColor:"white"
        }}>
        <View style={{
            flexDirection: 'row',
            margin: 5
        }}>
            <Image
                style={{
                    resizeMode: 'contain',
                    width: 80,
                    height: 100,
                    borderRadius: 20,
                    marginEnd: 5,
                }}
                source={
                    {
                        uri: `${Base_URL + endpoints.v1.upload() + item.productImage}`
                    }
                } />
            <Text style={{
                flex: 1,
                fontSize: Fontsizes.h3,
                textAlign: 'right',
            }}>
                {TotalPrice(item.giaSp)}đ
            </Text>
        </View>
        <Text
            numberOfLines={1}
            style={{
                flex: 1,
                fontSize: Fontsizes.h4,
                marginStart: 5

            }}>{item.tenSp}
        </Text>

        <Text style={{
            fontSize: Fontsizes.h4,
            marginStart: 10
        }}>sl: {item.tonKho}</Text>

        <Text
            numberOfLines={1}
            style={{
                fontSize: Fontsizes.h4,
                marginStart: 10,

            }}>- {item.moTa}</Text>

        <View style={{
            flex: 1,
            flexDirection: 'row',
            margin: 5
        }}>
            <TouchableOpacity
            
                onPress={onPress}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginEnd: 5
                }}>
                <Icon name="heart" size={22} style={{
                    color: item.isSaved == false || item.isSaved == undefined ? Colors.placeholder : 'red'
                }}
                />

                <Text style={{
                    marginStart: 5,
                    fontSize: Fontsizes.h6 * 0.8,
                    width: 50,
                    color: item.isSaved == false || item.isSaved == undefined ? Colors.placeholder : 'red'
                }}>Saved for late</Text>
            </TouchableOpacity>

            <View style={{
                flex: 1,
                marginStart: 10
            }}>
                <Fivestars numberOfStars={item.star} />
                <Text style={{
                    fontSize: Fontsizes.h6 * 0.8,
                    textAlign: 'right',
                    marginEnd: 5
                }}
                >{item.review} review</Text>
            </View>
        </View>
    </TouchableOpacity>
}
export default ProductItem