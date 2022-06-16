import React, { useState, useEffect } from "react";
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
    Alert,
    Picker

} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Colors } from "../components/Colors";
import HeaderDetail from "../components/HeaderDetail";
import { postProduct, updateProduct } from "../service/product";
import { getCategory } from "../service/category";
import endpoints from "../service/endpoints"
import { base_url, Base_URL } from '../configs/Configs'
import DropDownPicker from "react-native-dropdown-picker";

const FormProductScreen = (props) => {
    const { navigation, route } = props
    const { navigate, goBack } = navigation
    const product = route?.params?.data ?? null;
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState();
    const typeForm = product ? 'edit' : 'add';
    const [image, setImage] = useState(product?.productImage ?? '');

    const dataForm = {
        id: product?._id ?? '',
        name: product?.tenSp ?? '',
        regular_price: product?.giaSp
            ? product.giaSp.toString()
            : '0',
        sale_price: product?.giaKm
            ? product.giaKm.toString()
            : '0',
        sku: product?.maSp ?? '',
        description: product?.moTa ?? '',
        stock_quantity: product?.tonKho
            ? product.tonKho.toString()
            : '0',
    };

    const [data, setData] = useState(dataForm)
    useEffect(async () => {
        const res = await getCategory()
        setCategory(res.categories)
    }, [])

    const handleCreate = () => {
        try {
            postProduct({ ...data }, image)
            setLoading(false);
            if (route?.params?.goBack) {
                route.params.goBack();
            }
            goBack()
        } catch (error) {
            setLoading(false);
        }
    }

    const handleUpdate = () => {
        try {
            updateProduct({ ...data }, image)
            setLoading(false);
            if (route?.params?.goBackPrd) {
                route.params.goBackPrd();
            }
            goBack()

        } catch (error) {
            setLoading(false)
        }

    }

    const updateData = (key, value) => {
        setData({
            ...data,
            [key]: value,
        });
    };

    const saveProduct = () => {
        setLoading(true);
        if (product) {
            handleUpdate();
        } else {
            handleCreate();
        }
    };

    var options = {

        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };


    const handleSelectPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync(options, {
            mediaType: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            qualiti: 1
        })
        if (result.cancelled) {
            return
        }
        setImage(result)
    }
    console.log(category);

    return (
        <View style={styles.Container}>
            <HeaderDetail
                name="arrow-left"
                title={typeForm === 'edit'
                    ? "Cập nhật sản phẩm"
                    : "Tạo sản phẩm"}
                onPressLeft={() => { goBack() }}
            />
            <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>
                        <View style={styles.viewInput}>
                            <Text style={styles.txt}>Danh mục</Text>
                            <DropDownPicker
                                items={[{label: 'USA', value: 'usa'}, {label: 'UK', value: 'uk'}]}
                                defaultValue={category}
                                style={styles.input}
                                placeholder="Thời trang nữ"
                                onChangeItem={item => setCategory(item.name)}
                            />
                        </View>
                        <View style={styles.viewInput}>
                            <Text style={[styles.txt, { marginTop: 10 }]}>Tên sản phẩm</Text>
                            <TextInput
                                onChangeText={value => updateData('name', value)}
                                value={data?.name}
                                style={styles.input}
                            />

                            <View style={styles.rowInput}>
                                <View style={styles.colInput}>
                                    <Text style={styles.txt}>Giá sản phẩm</Text>
                                    <TextInput
                                        value={data?.regular_price}
                                        keyboardType="numeric"
                                        onChangeText={value => updateData('regular_price', value)}
                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.colInput}>
                                    <Text style={styles.txt}>Giá khuyến mãi</Text>
                                    <TextInput
                                        value={data?.sale_price}
                                        keyboardType="numeric"
                                        onChangeText={value =>
                                            updateData('sale_price', value)
                                        }
                                        style={styles.input}
                                    />
                                </View>
                            </View>

                            <View style={styles.rowInput}>
                                <View style={styles.colInput}>
                                    <Text style={styles.txt}>Mã sản phẩm</Text>
                                    <TextInput
                                        value={data?.sku}
                                        onChangeText={value => updateData('sku', value)}
                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.colInput}>
                                    <Text style={styles.txt}>Số lượng</Text>
                                    <TextInput
                                        value={data?.stock_quantity}
                                        keyboardType="numeric"
                                        onChangeText={value =>
                                            updateData('stock_quantity', value)
                                        }
                                        style={styles.input}
                                    />
                                </View>
                            </View>


                            <Text style={styles.txt}>Mô tả</Text>
                            <TextInput
                                value={data?.description}
                                onChangeText={value => updateData('description', value)}
                                style={styles.inputdes}
                                editable={true}
                                //maxLength={40}
                                multiline={true}
                                numberOfLines={10}
                            />

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
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "white",
                                            borderRadius: 10,
                                        }}>
                                            {image == "" ? <Image style={styles.img} source={require('../assets/images/default_image.png')} /> :
                                                (typeForm === "add" ? <Image style={styles.img} source={{ uri: image.uri }} /> :
                                                    //(typeForm === "edit" ? <Image style={styles.img} source={{ uri: image.uri }} /> :
                                                    (<Image style={styles.img} source={{ uri: `${Base_URL + endpoints.v1.upload() + image}` }} />))}
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
                        <TouchableOpacity onPress={saveProduct} style={styles.btncreate} loading={loading}>
                            <Text>{typeForm === 'edit'
                                ? "Cập nhật"
                                : "Tạo"}</Text>
                        </TouchableOpacity>
                        <View style={{
                            width: "80%",
                            //height: 100,
                            marginTop: 10
                        }}>
                            {/* <RadioButton
                                data={data}
                                selectedBtn={(e) => console.log(e)}
                            /> */}
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

        </View>
    )
}
export default FormProductScreen

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
        height: 120,
        width: 120,
        resizeMode: "contain"
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