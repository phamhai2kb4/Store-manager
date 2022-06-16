/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import endpoints from "../../../service/endpoints"
import { Base_URL } from '../../../configs/Configs'
import { useDispatch, useSelector } from 'react-redux'
import { ItemCart } from "../../../redux/action/CartAction";
import {createCart} from "../../../service/cart"
export default function ProductDetails(props) {
  const { navigation, route } = props
  const { navigate, goBack } = navigation
  const item = route.params
  // const dispatch = useDispatch()
  const info = useSelector((state) => state.personalInfo)
  const qty = 1
  const cart = {
    userId: info.user._id,
    productId: item._id,
    qty: qty,
    name: item.tenSp,
    price: item.giaSp,
    image: item.productImage
  }
  const addThisProductToCart = (e) => {
    Alert.alert(
      'Thông báo',
      'Đã thêm vào giỏ hàng',
      [
        {
          text: 'OK',
          onPress: () => {
            createCart(e)
            goBack()
          },
        },
        { cancelable: true },
      ]
    )
  }

  function TotalPrice(price) {
    return Number(price).toLocaleString('vi-VN');
  }


  return (
    <View style={styles.wrapper}>
      <View style={styles.cardStyle}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => goBack()}>
            <Icon
              name="arrow-left"
              size={25}
            />
          </TouchableOpacity>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold"
          }}>Chi tiết sản phẩm</Text>
          <TouchableOpacity
            onPress={() => addThisProductToCart(cart)}>
            <Icon
              name="cart-arrow-down"
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <ScrollView
            style={{ flexDirection: 'row', padding: 10, height: swiperHeight }}
            horizontal>
            <Image
              source={{ uri: `${Base_URL + endpoints.v1.upload() + item.productImage}` }}
              style={styles.productImageStyle}
            />
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <View style={styles.titleContainer}>
            <Text style={styles.textMain}>
              <Text style={styles.textBlack}>{item.tenSp.toUpperCase()}</Text>
              <Text style={styles.textHighlight}> / </Text>
              <Text style={styles.textSmoke}>{TotalPrice(item.giaSp)}đ</Text>
            </Text>
          </View>
          <View style={styles.descContainer}>
            <Text style={styles.descStyle}>Mô tả: {item.moTa}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const { width } = Dimensions.get('window');
const swiperWidth = width / 1.8 - 30;
const swiperHeight = (swiperWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#D6D6D6',
  },
  cardStyle: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  cartStyle: {
    width: 25,
    height: 25,
  },
  backStyle: {
    width: 25,
    height: 25,
  },
  productStyle: {
    width: width / 2,
    height: width / 2,
  },
  footer: {
    flex: 6,
  },
  imageContainer: {
    flex: 6,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  textMain: {
    paddingLeft: 20,
    marginVertical: 10,
  },
  textBlack: {
    fontFamily: 'Avenir',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F3F46',
  },
  textSmoke: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: '#9A9A9A',
  },
  textHighlight: {
    fontFamily: 'Avenir',
    fontSize: 20,
    color: '#7D59C8',
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
    marginHorizontal: 20,
    paddingBottom: 5,
  },
  descContainer: {
    margin: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  descStyle: {
    color: '#AFAFAF',
  },
  linkStyle: {
    color: '#7D59C8',
  },
  productImageStyle: {
    width: swiperWidth,
    height: swiperHeight,
    marginHorizontal: 5,
    resizeMode: "contain"
  },
  mainRight: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingLeft: 20,
  },
  txtColor: {
    color: '#C21C70',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtMaterial: {
    color: '#C21C70',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
});
