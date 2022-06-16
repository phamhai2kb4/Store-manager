import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    FlatList,
    Image

} from 'react-native';
import HeaderDetail from '../../../components/HeaderDetail'


const Categories = (props) => {
  const { navigation, route } = props
  const { navigate, goBack } = navigation
  return (
    <View style={{ flex: 1 }}>
      <HeaderDetail
        title= {route.params.name}
        name="arrow-left"
        onPressLeft={() => { goBack() }}
      />
    </View>
  )
}
export default Categories;
