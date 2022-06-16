import React, { useState, useEffect } from "react"
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList
} from "react-native"
import { getCategory } from '../../../service/category'
import endpoints from "../../../service/endpoints"
import { Base_URL } from '../../../configs/Configs'
function ItemCat(props) {
    const {onPress, item} = props
    useEffect(async () => {
        const res = await getCategory()
        setCategory(res.categories)
    }, [])

    const [categories, setCategory] = useState()
    return (
        <View style={{ height: 120 }}>
            <View style={{ borderTopWidth: 1, borderColor: 'black', opacity: 0.1 }} />
            <FlatList data={categories}
                horizontal={true}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return <TouchableOpacity
                        onPress={onPress}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 10
                        }}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: 70,
                                height: 70,
                                borderRadius: 10,
                                margin: 5,
                            }}
                            source={
                                {
                                    uri: `${Base_URL + endpoints.v1.upload() + item.image.substr(8, 100)}`
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
    )
}
export default ItemCat