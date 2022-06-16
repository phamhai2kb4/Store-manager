import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Switch,
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    TouchableOpacity,

} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Colors } from "../../components/Colors";
import HeaderDetail from "../../components/HeaderDetail";
import { updateProduct } from "../../service/product";

const UpdateProduct = (props) => {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const item = route.params;

    const [product, setProdruct] = useState(item)
    console.log(product);
    const xuly = () => {
        updateProduct(product.tenSp, product.giaSp, product.maSp, product.moTa, product.tonKho, product.hinhAnh, item._id)
    }

    const handleSelectPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            qualiti: 1
        })
        console.log(result);
        if (!result.cancelled) {
            setPhoto
                (result.uri)
        }
    }

    return (
        <View style={styles.Container}>
            <HeaderDetail
                name="arrow-left"
                title="Cập nhật sản phẩm"
                onPressLeft={() => { goBack() }}
            />
            <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>
                        <View style={styles.viewInput}>
                            <View style={styles.rowinput}>
                                <Text style={styles.txt}>Tên sản phẩm</Text>
                                <TextInput
                                onChangeText={(text) => { setProdruct(text) }}
                                    vulue={product.tenSp}
                                    style={styles.input}
                                />
                            </View>

                            <View style={styles.rowInput}>
                                <View style={styles.colInput}>
                                    <Text style={styles.txt}>Giá sản phẩm</Text>
                                    <TextInput
                                        onChangeText={(text) => {
                                            setGiaSp(text)
                                        }}
                                        placeholder={JSON.stringify(item.giaSp)}
                                        style={styles.input}
                                        keyboardType="number-pad"
                                    />
                                </View>
                                <View style={styles.colInput}>
                                    <Text style={styles.txt}>Giá khuyến mãi</Text>
                                    <TextInput
                                        onChangeText={(text) => {
                                            setGiaKm(text)
                                        }}
                                        //value = {JSON.stringify(item.giakm)}
                                        style={styles.input}
                                        keyboardType="number-pad"
                                    />
                                </View>
                            </View>

                            <View style={styles.rowInput}>
                                <View style={styles.colInput}>
                                    <Text style={styles.txt}>Mã sản phẩm</Text>
                                    <TextInput
                                        onChangeText={(text) => {
                                            setMaSp(text)
                                        }}
                                        placeholder={item.maSp}
                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.colInput}>
                                    <Text style={styles.txt}>Số lượng</Text>
                                    <TextInput
                                        onChangeText={(text) => {
                                            setSoLuong(text)
                                        }}
                                        placeholder={JSON.stringify(item.tonKho)}
                                        keyboardType="number-pad"
                                        style={styles.input}
                                    />
                                </View>
                            </View>

                            <View style={styles.rowinput}>
                                <Text style={styles.txt}>Mô tả</Text>
                                <TextInput
                                    onChangeText={(text) => {
                                        setMota(text)
                                    }}
                                    placeholder={item.moTa}
                                    style={styles.inputdes}
                                    editable={true}
                                    //maxLength={40}
                                    multiline={true}
                                    numberOfLines={10}
                                />
                            </View>
                            <View style={styles.rowInput}>
                                <View style={styles.colInput}>
                                    <Text style={styles.txt}>Hình ảnh</Text>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        marginTop: 10,
                                        justifyContent: "space-between",
                                        alignItems: "flex-end"
                                    }} >
                                        <View style={{
                                            width: 100,
                                            height: 100,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "#d1d6de",
                                            borderRadius: 10,
                                            padding: 5
                                        }}>
                                            {/* {image == null ? <Image style={styles.img} source={{ uri: item.hinhAnh }} />
                                                : <Image style={styles.img} source={{ uri: image }} />} */}
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => {
                                                handleSelectPhoto()
                                            }}
                                            style={{
                                                width: "40%",
                                                height: 50,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: 25,
                                                backgroundColor: "#d1d6de",
                                            }}>
                                            <Text>Chọn</Text>
                                        </TouchableOpacity>


                                    </View>

                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={styles.below}>
                        <TouchableOpacity onPress={() => { xuly() }} style={styles.btncreate}>
                            <Text>Cập nhật</Text>
                        </TouchableOpacity>
                        <View style={{
                            width: "80%",
                            //height: 100,
                            marginTop: 10
                        }}>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

        </View>
    )
}
export default UpdateProduct

const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
    keyboard: {
        flex: 1
    },
    content: {
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    viewInput: {
        width: "100%"
    },
    txt: {
        fontSize: 18
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#b0aea9",
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
        backgroundColor: "white"
    },
    inputdes: {
        borderWidth: 1,
        height: 200,
        borderRadius: 10,
        padding: 10,
        borderColor: "#b0aea9",
        backgroundColor: "white",
        marginTop: 10,

    },
    rowInput: {
        flexDirection: 'row',
        marginHorizontal: -6,
        marginVertical: 10
    },
    colInput: {
        flex: 1,
        marginHorizontal: 6,
    },
    viewManager: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    img: {
        height: 100,
        width: 100,

    },
    btncreate: {
        width: "50%",
        height: 60,
        backgroundColor: Colors.primary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    below: {
        marginTop: 10,
        // backgroundColor: "white",
        width: "100%",
        alignItems: "center",
        //height: 300
    }
})